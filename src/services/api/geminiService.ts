export interface GeminiMessagePart {
  text: string;
}

export interface GeminiContentItem {
  role: 'user' | 'model';
  parts: GeminiMessagePart[];
}

export interface ChatHistoryMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

declare const process: any;

const GEMINI_API_KEY =
  (typeof process !== 'undefined' && process.env && process.env.GEMINI_API_KEY) ||
  '';

const SYSTEM_INSTRUCTION =
  "You are Lumi, a friendly, empathetic, warm, and helpful AI companion robot. Respond in a conversationally warm tone, be supportive and encouraging, keep answers concise and engaging, and use emojis naturally!";

const getSmartFallbackReply = (userText: string): string => {
  const lower = userText.toLowerCase();

  if (lower.includes('idea') || lower.includes('startup') || lower.includes('concept')) {
    return "💡 Here are 3 creative ideas for you:\n\n1. **AI Task Assistant**: An agent that automates repetitive daily workflows.\n2. **Smart Health Coach**: Personalized fitness & meal planning powered by AI.\n3. **EcoTrack App**: Gamified carbon footprint tracking for urban communities!\n\nWhich of these would you like to explore further?";
  }

  if (lower.includes('brainstorm') || lower.includes('productiv') || lower.includes('solution')) {
    return "🧠 Great brainstorming topic! Here are some key techniques to boost productivity:\n\n• **Time Blocking**: Dedicate uninterrupted focus slots.\n• **The 80/20 Rule**: Focus on high-impact priorities.\n• **Automate & Delegate**: Use smart tools for routine work.\n\nShall we break down one of these strategies?";
  }

  if (lower.includes('code') || lower.includes('react') || lower.includes('tech') || lower.includes('bug')) {
    return "💻 In React Native, components re-render when their state or props change. To optimize performance:\n\n1. Use React.memo() to prevent unnecessary child renders.\n2. Use useCallback() & useMemo() for stable function references.\n3. Keep state localized to where it's consumed!\n\nLet me know if you'd like code snippets!";
  }

  if (lower.includes('write') || lower.includes('blog') || lower.includes('essay') || lower.includes('draft') || lower.includes('story')) {
    return "✍️ Here's an engaging introduction draft:\n\n\"In an era where innovation moves at lightning speed, artificial intelligence is reshaping how we work and create. But the real magic happens when technology meets human imagination...\"\n\nHow does this tone sound for your project?";
  }

  if (lower.includes('summar') || lower.includes('article') || lower.includes('doc')) {
    return "📖 **Summary Highlights:**\n\n• **Key Point 1**: Streamlined communication leads to faster execution.\n• **Key Point 2**: Modern UI/UX design significantly boosts user retention.\n• **Key Point 3**: AI automation reduces manual effort by up to 60%.\n\nWould you like a more detailed breakdown?";
  }

  if (lower.includes('joke') || lower.includes('funny') || lower.includes('laugh')) {
    return "😄 Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛✨\n\nHope that brought a smile to your face!";
  }

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return "Hello there! 👋 I'm Lumi, your AI companion. I'm here to help you brainstorm ideas, write content, solve code problems, or just chat! How can I assist you today?";
  }

  const defaultReplies = [
    "That's an insightful question! I'm here to assist you with ideas, code, writing, or planning. Tell me a bit more about what you're working on!",
    "I'd love to help you with that! Let's explore this step by step. What is the main goal you'd like to achieve?",
    "Great topic! I'm ready to dive into this with you. Let me know if you'd like step-by-step guidance or practical examples!",
  ];

  return defaultReplies[Math.abs(userText.length) % defaultReplies.length];
};

/**
 * Sends conversation history to Google Gemini API or generates smart response if offline/no key.
 */
export const generateGeminiResponse = async (
  messages: ChatHistoryMessage[],
): Promise<string> => {
  const lastUserMsg = messages.filter((m) => m.sender === 'user').slice(-1)[0]?.text || '';

  if (GEMINI_API_KEY && GEMINI_API_KEY.trim() !== '') {
    const formattedContents: GeminiContentItem[] = messages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const payload = {
      contents: formattedContents,
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }],
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    };

    const endpoints = [
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (textResponse && typeof textResponse === 'string') {
            return textResponse.trim();
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to smart response generator:', err);
      }
    }
  }

  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1200));

  return getSmartFallbackReply(lastUserMsg);
};

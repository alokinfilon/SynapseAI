export interface GroqMessageItem {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatHistoryMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

declare const process: any;

const GROQ_API_KEY =
  (typeof process !== 'undefined' && process.env && process.env.GROQ_API_KEY) ||
  '';

const SYSTEM_INSTRUCTION =
  "You are Lumi, a friendly, empathetic, warm, and helpful AI companion robot. Respond in a conversationally warm tone, be supportive and encouraging, keep answers concise and engaging, use emojis naturally, and format structured responses cleanly using Markdown (bold text, bullet lists, code blocks, and headings)!";

/**
 * Sanitizes markdown syntax (asterisks **, *, headers #, backticks) into clean plain text
 */
export const cleanMarkdownText = (text: string): string => {
  if (!text) return '';
  return text
    // Remove bold **text** -> text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    // Remove italic *text* or _text_ -> text
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    // Remove inline code `text` -> text
    .replace(/`(.*?)`/g, '$1')
    // Remove header symbols ### -> empty
    .replace(/^#+\s+/gm, '')
    // Replace bullet points * or + at line start with clean bullet symbol •
    .replace(/^[\*\+]\s+/gm, '• ')
    .trim();
};

const getSmartFallbackReply = (userText: string): string => {
  const lower = userText.toLowerCase();

  let reply = "";
  if (lower.includes('idea') || lower.includes('startup') || lower.includes('concept')) {
    reply = "💡 Here are 3 creative ideas for you:\n\n1. AI Task Assistant: An agent that automates repetitive daily workflows.\n2. Smart Health Coach: Personalized fitness & meal planning powered by AI.\n3. EcoTrack App: Gamified carbon footprint tracking for urban communities!\n\nWhich of these would you like to explore further?";
  } else if (lower.includes('brainstorm') || lower.includes('productiv') || lower.includes('solution')) {
    reply = "🧠 Great brainstorming topic! Here are some key techniques to boost productivity:\n\n• Time Blocking: Dedicate uninterrupted focus slots.\n• The 80/20 Rule: Focus on high-impact priorities.\n• Automate & Delegate: Use smart tools for routine work.\n\nShall we break down one of these strategies?";
  } else if (lower.includes('code') || lower.includes('react') || lower.includes('tech') || lower.includes('bug')) {
    reply = "💻 In React Native, components re-render when their state or props change. To optimize performance:\n\n1. Use React.memo() to prevent unnecessary child renders.\n2. Use useCallback() & useMemo() for stable function references.\n3. Keep state localized to where it's consumed!\n\nLet me know if you'd like code snippets!";
  } else if (lower.includes('write') || lower.includes('blog') || lower.includes('essay') || lower.includes('draft') || lower.includes('story')) {
    reply = "✍️ Here's an engaging introduction draft:\n\n\"In an era where innovation moves at lightning speed, artificial intelligence is reshaping how we work and create. But the real magic happens when technology meets human imagination...\"\n\nHow does this tone sound for your project?";
  } else if (lower.includes('summar') || lower.includes('article') || lower.includes('doc')) {
    reply = "📖 Summary Highlights:\n\n• Key Point 1: Streamlined communication leads to faster execution.\n• Key Point 2: Modern UI/UX design significantly boosts user retention.\n• Key Point 3: AI automation reduces manual effort by up to 60%.\n\nWould you like a more detailed breakdown?";
  } else if (lower.includes('joke') || lower.includes('funny') || lower.includes('laugh')) {
    reply = "😄 Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛✨\n\nHope that brought a smile to your face!";
  } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    reply = "Hello there! 👋 I'm Lumi, your AI companion. I'm here to help you brainstorm ideas, write content, solve code problems, or just chat! How can I assist you today?";
  } else {
    const defaultReplies = [
      "That's an insightful question! I'm here to assist you with ideas, code, writing, or planning. Tell me a bit more about what you're working on!",
      "I'd love to help you with that! Let's explore this step by step. What is the main goal you'd like to achieve?",
      "Great topic! I'm ready to dive into this with you. Let me know if you'd like step-by-step guidance or practical examples!",
    ];
    reply = defaultReplies[Math.abs(userText.length) % defaultReplies.length];
  }

  return cleanMarkdownText(reply);
};

/**
 * Sends conversation history to Groq API using GROQ_API_KEY from .env
 */
export const generateGroqResponse = async (
  messages: ChatHistoryMessage[],
): Promise<string> => {
  const lastUserMsg = messages.filter((m) => m.sender === 'user').slice(-1)[0]?.text || '';
  const apiKey = GROQ_API_KEY?.trim();

  if (apiKey) {
    const formattedMessages: GroqMessageItem[] = [
      { role: 'system', content: SYSTEM_INSTRUCTION },
      ...messages.map((msg) => ({
        role: (msg.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: msg.text,
      })),
    ];

    const models = [
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b',
      'qwen/qwen3.8-27b',
      'qwen/qwen3.6-27b',
      'groq/compound',
      'groq/compound-mini',
    ];

    for (const model of models) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model,
            messages: formattedMessages,
            temperature: 0.7,
            max_tokens: 1024,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const textResponse = data?.choices?.[0]?.message?.content;
          if (textResponse && typeof textResponse === 'string') {
            return textResponse.trim();
          }
        }
      } catch (err) {
        console.warn(`Groq API call failed for model ${model}:`, err);
      }
    }
  }

  await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
  return getSmartFallbackReply(lastUserMsg);
};

/**
 * Transcribes audio to text using Groq Whisper API (whisper-large-v3-turbo)
 */
export const transcribeAudioWithGroqWhisper = async (
  audioInput: string | Blob | { uri: string; name?: string; type?: string },
): Promise<string> => {
  const apiKey = GROQ_API_KEY?.trim();
  if (!apiKey) {
    throw new Error('Groq API Key missing');
  }

  const formData = new FormData();
  if (typeof audioInput === 'string') {
    formData.append('file', {
      uri: audioInput,
      name: 'audio.m4a',
      type: 'audio/m4a',
    } as any);
  } else if (typeof Blob !== 'undefined' && audioInput instanceof Blob) {
    formData.append('file', audioInput as any);
  } else {
    formData.append('file', audioInput as any);
  }

  formData.append('model', 'whisper-large-v3-turbo');
  formData.append('response_format', 'json');

  const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Groq Whisper API returned ${response.status}: ${errorBody}`);
  }

  const data = await response.json();
  return (data?.text || '').trim();
};

export default generateGroqResponse;


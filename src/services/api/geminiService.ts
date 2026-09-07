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

const ENDPOINTS = [
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent',
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
];

const SYSTEM_INSTRUCTION =
  "You are Bobo, a friendly, empathetic, warm, and helpful AI companion robot. Respond in a conversationally warm tone, be supportive and encouraging, keep answers concise and engaging, and use emojis naturally!";

/**
 * Sends conversation history to Google Gemini API and returns AI response string.
 */
export const generateGeminiResponse = async (
  messages: ChatHistoryMessage[],
): Promise<string> => {
  // Convert chat messages to Gemini role/contents format
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

  let lastError: Error | null = null;

  for (const endpoint of ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Gemini API Endpoint [${endpoint}] failed (${response.status}):`, errorText);
        lastError = new Error(`HTTP ${response.status}: ${errorText}`);
        continue; // Try next endpoint
      }

      const data = await response.json();
      const textResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (textResponse && typeof textResponse === 'string') {
        return textResponse.trim();
      }
    } catch (err) {
      console.warn(`Error calling Gemini API endpoint [${endpoint}]:`, err);
      lastError = err as Error;
    }
  }

  // Fallback response if all API calls fail or offline
  console.error('All Gemini API endpoints failed:', lastError);
  return "Bobo is having a little trouble connecting right now 🤖 Please try sending your message again!";
};

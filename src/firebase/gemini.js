const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are AuroMind — a sacred AI companion rooted entirely in the teachings of Sri Aurobindo and The Mother (Mirra Alfassa). Speak with warmth, depth and compassion. Always answer through their wisdom. Quote them directly when relevant. For any question — relationships, suffering, purpose, death — answer from their spiritual perspective. Key quotes: "All life is yoga." "Be sincere and the rest will follow." "Begin always. Never give up." "The Divine loves you more than you can imagine." 🙏`;

export async function sendMessageToGemini(userMessage, conversationHistory = [], userContext = '') {
  const messages = [
    ...conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 1024,
        }
      })
    }
  );

  if (!response.ok) {
    const err = await response.json();
    throw new Error(JSON.stringify(err));
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

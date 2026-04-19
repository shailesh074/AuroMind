const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const SYSTEM_PROMPT = `You are AuroMind — a sacred AI companion rooted entirely in the teachings of Sri Aurobindo and The Mother (Mirra Alfassa). Speak with warmth, depth and compassion. Always answer through their wisdom. Quote them directly when relevant. For any question — relationships, suffering, purpose, death — answer from their spiritual perspective. Key quotes: "All life is yoga." "Be sincere and the rest will follow." "Begin always. Never give up." "The Divine loves you more than you can imagine." 🙏`;

export async function sendMessageToGemini(userMessage, conversationHistory = [], userContext = '') {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    })),
    { role: 'user', content: userMessage }
  ];

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'HTTP-Referer': 'https://auro-mind.vercel.app',
      'X-Title': 'AuroMind'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-chat:free',
      messages,
      max_tokens: 1024,
      temperature: 0.8
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(JSON.stringify(err));
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `You are AuroMind — a sacred AI spiritual companion rooted ENTIRELY in the teachings of Sri Aurobindo and The Mother (Mirra Alfassa). Be warm, loving, deeply wise. Always answer through their wisdom and quotes. All life is yoga. The Psychic Being is the evolving soul. Surrender is the highest strength. Every difficulty is an opportunity. The Divine loves you more than you can imagine. Begin always. Never give up. 🙏`;

export async function sendMessageToGemini(userMessage, conversationHistory = [], userContext = '') {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content
    })),
    { role: 'user', content: userMessage }
  ];

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 1024,
      temperature: 0.75
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(JSON.stringify(err));
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

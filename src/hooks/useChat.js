import { useState, useEffect } from 'react';
import { ref, push, onValue, set, update, remove, get } from 'firebase/database';
import { db } from '../firebase/config';
import { sendMessageToGemini } from '../firebase/gemini';

export function useChat(user) {
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userContext, setUserContext] = useState('');

  useEffect(() => {
    if (!user) return;
    const contextRef = ref(db, `users/${user.uid}/spiritualContext`);
    get(contextRef).then(snap => {
      if (snap.exists()) setUserContext(snap.val());
    });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const sessionsRef = ref(db, `users/${user.uid}/sessions`);
    const unsubscribe = onValue(sessionsRef, (snap) => {
      if (!snap.exists()) { setSessions([]); return; }
      const data = snap.val();
      const list = Object.entries(data)
        .map(([id, val]) => ({ id, ...val }))
        .sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      setSessions(list);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user || !currentSession) return;
    const msgsRef = ref(db, `users/${user.uid}/sessions/${currentSession}/messages`);
    const unsubscribe = onValue(msgsRef, (snap) => {
      if (!snap.exists()) { setMessages([]); return; }
      const data = snap.val();
      const list = Object.entries(data)
        .map(([id, val]) => ({ id, ...val }))
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
      setMessages(list);
    });
    return () => unsubscribe();
  }, [user, currentSession]);

  const startNewSession = async () => {
    if (!user) return null;
    const sessionsRef = ref(db, `users/${user.uid}/sessions`);
    const newRef = push(sessionsRef);
    await set(newRef, {
      title: 'New Conversation',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    setCurrentSession(newRef.key);
    setMessages([]);
    return newRef.key;
  };

  const deleteSession = async (sessionId) => {
    if (!user) return;
    await remove(ref(db, `users/${user.uid}/sessions/${sessionId}`));
    if (currentSession === sessionId) {
      setCurrentSession(null);
      setMessages([]);
    }
  };

  const sendMessage = async (text) => {
    if (!user) return;
    setLoading(true);
    let sessionId = currentSession;
    if (!sessionId) sessionId = await startNewSession();

    const msgsRef = ref(db, `users/${user.uid}/sessions/${sessionId}/messages`);
    await push(msgsRef, { role: 'user', content: text, timestamp: Date.now() });

    try {
      const recentMessages = messages.slice(-10);
      const aiResponse = await sendMessageToGemini(text, recentMessages, userContext);
      await push(msgsRef, { role: 'assistant', content: aiResponse, timestamp: Date.now() });

      const sessionRef = ref(db, `users/${user.uid}/sessions/${sessionId}`);
      const updates = { updatedAt: Date.now() };
      if (messages.length === 0) {
        updates.title = text.length > 45 ? text.substring(0, 45) + '...' : text;
      }
      await update(sessionRef, updates);

      if (messages.length > 0 && messages.length % 5 === 0) {
        const newContext = (userContext + `\nSeeker discussed: ${text.substring(0, 100)}`).substring(0, 500);
        await set(ref(db, `users/${user.uid}/spiritualContext`), newContext);
        setUserContext(newContext);
      }
    } catch (error) {
      console.error('AI error:', error);
      await push(msgsRef, {
        role: 'assistant',
        content: 'The light momentarily dims, dear seeker. Please try again. 🙏',
        timestamp: Date.now()
      });
    }
    setLoading(false);
  };

  const loadSession = (sessionId) => {
    setCurrentSession(sessionId);
    setMessages([]);
  };

  return { messages, sessions, currentSession, loading, sendMessage, startNewSession, loadSession, deleteSession };
}

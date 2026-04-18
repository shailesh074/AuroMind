import { useState, useEffect } from 'react';
import { 
  collection, addDoc, query, orderBy, onSnapshot, 
  doc, setDoc, getDoc, updateDoc, serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { sendMessageToGemini } from '../firebase/gemini';

export function useChat(user) {
  const [messages, setMessages] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userContext, setUserContext] = useState('');

  // Load user context (accumulated understanding of the seeker)
  useEffect(() => {
    if (!user) return;
    const loadContext = async () => {
      const contextDoc = await getDoc(doc(db, 'users', user.uid));
      if (contextDoc.exists()) {
        setUserContext(contextDoc.data().spiritualContext || '');
      }
    };
    loadContext();
  }, [user]);

  // Load chat sessions
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'users', user.uid, 'sessions'),
      orderBy('updatedAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setSessions(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, [user]);

  // Load messages for current session
  useEffect(() => {
    if (!user || !currentSession) return;
    const q = query(
      collection(db, 'users', user.uid, 'sessions', currentSession, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsubscribe;
  }, [user, currentSession]);

  const startNewSession = async () => {
    if (!user) return null;
    const sessionRef = await addDoc(collection(db, 'users', user.uid, 'sessions'), {
      title: 'New Conversation',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    setCurrentSession(sessionRef.id);
    setMessages([]);
    return sessionRef.id;
  };

  const sendMessage = async (text) => {
    if (!user) return;
    setLoading(true);

    let sessionId = currentSession;
    if (!sessionId) {
      sessionId = await startNewSession();
    }

    // Save user message
    await addDoc(
      collection(db, 'users', user.uid, 'sessions', sessionId, 'messages'),
      { role: 'user', content: text, timestamp: serverTimestamp() }
    );

    try {
      // Get AI response
      const recentMessages = messages.slice(-10);
      const aiResponse = await sendMessageToGemini(text, recentMessages, userContext);

      // Save AI message
      await addDoc(
        collection(db, 'users', user.uid, 'sessions', sessionId, 'messages'),
        { role: 'assistant', content: aiResponse, timestamp: serverTimestamp() }
      );

      // Update session title from first message
      if (messages.length === 0) {
        const title = text.length > 40 ? text.substring(0, 40) + '...' : text;
        await updateDoc(doc(db, 'users', user.uid, 'sessions', sessionId), {
          title,
          updatedAt: serverTimestamp(),
        });
      } else {
        await updateDoc(doc(db, 'users', user.uid, 'sessions', sessionId), {
          updatedAt: serverTimestamp(),
        });
      }

      // Update spiritual context every 5 messages
      if (messages.length % 5 === 0 && messages.length > 0) {
        const newContext = `${userContext}\nSeeker has discussed: ${text.substring(0, 100)}`;
        await updateDoc(doc(db, 'users', user.uid), {
          spiritualContext: newContext.substring(0, 500),
        });
        setUserContext(newContext.substring(0, 500));
      }

    } catch (error) {
      console.error('Error getting AI response:', error);
      await addDoc(
        collection(db, 'users', user.uid, 'sessions', sessionId, 'messages'),
        { 
          role: 'assistant', 
          content: 'The light momentarily dims, dear seeker. Please try again. 🙏', 
          timestamp: serverTimestamp() 
        }
      );
    }

    setLoading(false);
  };

  const loadSession = (sessionId) => {
    setCurrentSession(sessionId);
    setMessages([]);
  };

  return { messages, sessions, currentSession, loading, sendMessage, startNewSession, loadSession };
}

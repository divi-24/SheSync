import { useEffect, useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    await addDoc(collection(db, "messages"), {
      text: input,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div>
      <h2>Community Chat</h2>
      <div>
        {messages.map((msg) => (
          <p key={msg.id}>{msg.text}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;

import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const q = query(collection(db, `posts/${postId}/comments`), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, [postId]);

  const addComment = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, `posts/${postId}/comments`), {
      text,
      timestamp: serverTimestamp(),
    });
    setText("");
  };

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((c) => (
        <p key={c.id}>{c.text}</p>
      ))}
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add comment" />
      <button onClick={addComment}>Post</button>
    </div>
  );
};

export default CommentSection;

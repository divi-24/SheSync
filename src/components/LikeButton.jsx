import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";

const LikeButton = ({ postId }) => {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const postRef = doc(db, "posts", postId);
      const docSnap = await getDoc(postRef);
      if (docSnap.exists()) {
        setLikes(docSnap.data().likes || 0);
      }
    };
    fetchLikes();
  }, [postId]);

  const handleLike = async () => {
    const postRef = doc(db, "posts", postId);
    const docSnap = await getDoc(postRef);
    if (docSnap.exists()) {
      const currentLikes = docSnap.data().likes || 0;
      await updateDoc(postRef, { likes: currentLikes + 1 });
      setLikes(currentLikes + 1);
    } else {
      await setDoc(postRef, { likes: 1 });
      setLikes(1);
    }
  };

  return (
    <button onClick={handleLike}>❤️ {likes}</button>
  );
};

export default LikeButton;

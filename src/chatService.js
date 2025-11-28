import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

export const sendMessage = async (chatId, senderId, text) => {
  if (!text.trim()) return;

  await addDoc(collection(db, "messages", chatId, "threads"), {
    senderId,
    text,
    timestamp: serverTimestamp(),
  });
};

export const listenToMessages = (chatId, callback) => {
  const q = query(
    collection(db, "messages", chatId, "threads"),
    orderBy("timestamp", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    callback(msgs);
  });
};
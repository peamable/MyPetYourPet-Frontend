import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

export const sendMessage = async (chatId, senderId, text, receiverId = null) => {
  if (!text.trim()) return;

  // Reference to parent chat document
  const chatRef = doc(db, "messages", chatId);
  const chatSnap = await getDoc(chatRef);

  // If parent doc doesn't exist, create it
  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      createdAt: serverTimestamp(),
      participants: receiverId ? [senderId, receiverId] : [senderId],
    });
  }

  // Add the message to the threads subcollection
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
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import ChatBox from "../components/ChatBox";
import "../styles/MessagingView.css";

export default function MessagingView({ embedded }) {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const accountId = String(localStorage.getItem("accountId"));
  console.log(accountId)

  useEffect(() => {
    const fetchChats = async () => {
      const messagesRef = collection(db, "messages");
      const snapshot = await getDocs(messagesRef);

      const list = [];

      for (const docSnap of snapshot.docs) {
        const chatId = docSnap.id;
        // 🔍 DEBUG LOGS — PRINT VALUES
  // console.log("CHECKING CHAT:", chatId, "against accountId:", accountId);
  // console.log("INCLUDES RESULT:", chatId.includes(accountId));
  // console.log("accountId CHAR BY CHAR:", [...accountId]);
  // console.log("chatId CHAR BY CHAR:", [...chatId]);


        // Only show chats that involve this user
        const ids = chatId.split("_");
        // if (chatId.includes(accountId)) {
        if(ids.includes(accountId)){
          // const ids = chatId.split("_");
          const otherUser = ids[0] === accountId ? ids[1] : ids[0];

          const lastMsgQuery = query(
            collection(db, "messages", chatId, "threads"),
            orderBy("timestamp", "desc"),
            limit(1)
          );

          const lastMsgSnap = await getDocs(lastMsgQuery);
          const lastMessage = lastMsgSnap.empty
            ? "No messages yet"
            : lastMsgSnap.docs[0].data().text;

          list.push({
            chatId,
            otherUser,
            lastMessage,
          });
        }
      }

      setChats(list);
    };

    fetchChats();
  }, [accountId]);
  console.log("DB in MessagingView:", db);

  return (
    <div className={embedded ? "embedded-messages" : "messages-page"}>
      {!embedded && <h2>Messages</h2>}

      <div className="messages-list">
        {chats.length === 0 && <p>No conversations yet.</p>}

        {chats.map((chat) => (
          <div
            key={chat.chatId}
            onClick={() => setActiveChat(chat.chatId)}
            className="message-list-item"
          >
            <div className="message-user">Chat with User {chat.otherUser}</div>
            <div className="message-preview">{chat.lastMessage}</div>
          </div>
        ))}
      </div>

      {/* Chat Window */}
      {activeChat && (
        <ChatBox
          chatId={activeChat}
          senderId={accountId}
          onClose={() => setActiveChat(null)}
        />
      )}
    </div>
  );
}
import React, { useEffect, useState } from "react";
import { sendMessage, listenToMessages } from "../chatService";
import "../styles/ChatBox.css";

import { db } from "../firebaseConfig"; 
import { getFirestore } from "firebase/firestore";

const ChatBox = ({ chatId, senderId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsub = listenToMessages(chatId, setMessages);
    return () => unsub();
  }, [chatId]);

  const handleSend = async () => {
    await sendMessage(chatId, senderId, text);
    setText("");
  };
  // console.log("DB in ChatBox:", db);

  return (
    <div className="chatbox">
      <button className="close-btn" onClick={onClose}>X</button>

      <div className="messages">
        {messages.map((m) => (
          <div
            key={m.id}
            className={m.senderId === senderId ? "my-message" : "their-message"}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="input-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;

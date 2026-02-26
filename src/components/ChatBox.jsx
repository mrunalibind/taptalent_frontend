import { useEffect, useRef } from "react";

function ChatBox({ messages }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${msg.sender === "me" ? "me" : "partner"}`}
        >
          {msg.text}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
}

export default ChatBox;
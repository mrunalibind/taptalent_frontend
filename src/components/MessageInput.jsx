import { useState } from "react";

function MessageInput({ onSend, onSkip }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="input-area">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        maxLength={300}
      />
      <button onClick={handleSend}>Send</button>
      <button onClick={onSkip}>Skip</button>
    </div>
  );
}

export default MessageInput;
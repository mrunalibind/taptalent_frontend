import { useState } from "react";

function MessageInput({ onSend, onSkip, onTyping, onStopTyping }) {
  const [input, setInput] = useState("");
  let typingTimeout;

  const handleChange = (e) => {
    setInput(e.target.value);

    if (onTyping) onTyping();

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      if (onStopTyping) onStopTyping();
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
    if(onStopTyping) onStopTyping();
  };

  return (
    <div className="input-area">
      <input
        value={input}
        onChange={handleChange}
        placeholder="Type a message..."
        maxLength={300}
      />
      <button onClick={handleSend}>Send</button>
      <button onClick={onSkip}>Skip</button>
    </div>
  );
}

export default MessageInput;
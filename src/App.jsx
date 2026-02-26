import { useState, useEffect } from "react";
import { socket } from "./services/socket";
import ChatBox from "./components/ChatBox.jsx";
import MessageInput from "./components/MessageInput.jsx";
import StatusBar from "./components/StatusBar.jsx";

function App() {
  const [status, setStatus] = useState("IDLE");
  const [messages, setMessages] = useState([]);

  const startSearch = () => {
    socket.connect();
    socket.emit("start_search");
    setStatus("SEARCHING");
    setMessages([]);
  };

  const sendMessage = (text) => {
    socket.emit("send_message", text);
    setMessages(prev => [...prev, { sender: "me", text }]);
  };

  const handleSkip = () => {
    socket.emit("skip");
    setMessages([]);
    setStatus("SEARCHING");
  };

  useEffect(() => {
    socket.on("matched", () => setStatus("CONNECTED"));
    socket.on("searching", () => setStatus("SEARCHING"));

    socket.on("receive_message", (data) => {
      setMessages(prev => [...prev, { sender: "partner", text: data.message }]);
    });

    socket.on("partner_disconnected", () => {
      setStatus("DISCONNECTED");
      setMessages([]);
    });

    socket.on("partner_skipped", () => {
      setStatus("SKIPPED");
      setMessages([]);
    });

    return () => socket.removeAllListeners();
  }, []);

  return (
    <div className="app-container">
      <h1>Anonymous Chat System</h1>
      <StatusBar status={status} />

      {status === "IDLE" && (
        <button onClick={startSearch}>Start Searching</button>
      )}

      {status === "SEARCHING" && <p>Finding someone...</p>}

      {status === "CONNECTED" && (
        <>
          <ChatBox messages={messages} />
          <MessageInput onSend={sendMessage} onSkip={handleSkip} />
        </>
      )}
    </div>
  );
}

export default App;
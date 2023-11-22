import { useState } from "react";
import "./App.css";

const App = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  console.log("messages", messages);

  const getResponse = async () => {
    const response = await fetch(`http://localhost:8000/prompt/${text}`);
    const data = await response.json();
    console.log("data", data);
    setMessages([
      ...messages,
      {
        author: data.messages[0].content,
        bot: data.candidates[0].content,
      },
    ]);
  };

  console.log(text);

  return (
    <div className="chat-bot">
      <div className="chat-header">
        <div className="info-container">
          <h3>Chat with</h3>
          <h2>PaLM 2 Bot</h2>
        </div>
      </div>
      <div className="feed">
        {messages?.map((message, _index) => (
          <div key={_index}>
            <div className="question bubble">{message.author}</div>
            <div className="response bubble">{message.bot}</div>
          </div>
        ))}
      </div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={getResponse}>⇨</button>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import "./App.css";

const App = () => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const getResponse = async () => {
        try {
            const response = await fetch(`http://localhost:8000/prompt/${text}`);
            const data = await response.json();

            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    author: data.messages[0].content,
                    bot: data.candidates[0].content,
                },
            ]);
        } catch (error) {
            console.error("Error fetching response:", error);
            // Handle the error gracefully, e.g., show a user-friendly message.
        }
    };

    return (
        <div className="chat-bot">
            <div className="chat-header">
                <div className="info-container">
                    <h3>Chat with</h3>
                    <h2>SDC Chat Bot</h2>
                </div>
            </div>
            <div className="feed">
                {messages.map((message, index) => (
                    <div key={index}>
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

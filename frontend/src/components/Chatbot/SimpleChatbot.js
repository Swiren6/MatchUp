import React, { useState } from 'react';
import './chatbotStyles.css';
import { responses } from './responses';

const SimpleChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Bonjour ! Comment puis-je vous aider ?", sender: "bot" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Ajouter le message utilisateur
    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    
    // Trouver une réponse
    const lowerInput = input.toLowerCase();
    let response = responses.default;
    
    Object.keys(responses).forEach(key => {
      if (lowerInput.includes(key)) {
        response = responses[key];
      }
    });
    
    // Réponse du bot avec délai
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, sender: "bot" }]);
    }, 500);
    
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Tapez votre message..."
        />
        <button onClick={handleSend}>Envoyer</button>
      </div>
    </div>
  );
};

export default SimpleChatbot;
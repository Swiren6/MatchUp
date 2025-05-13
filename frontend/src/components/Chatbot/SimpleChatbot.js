import React, { useState, useEffect, useRef } from 'react';
import './chatbotStyles.css';
import { getRecruitmentResponse } from './responses';

const SimpleChatbot = () => {
  const [messages, setMessages] = useState([
    { 
      text: "Bonjour et bienvenue sur notre plateforme de recrutement ! Comment puis-je vous aider aujourd'hui ?", 
      sender: "bot",
      suggestions: ["Postes disponibles", "Processus de recrutement", "Dépôt de CV"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll vers les nouveaux messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulation de délai de frappe du bot
    setIsTyping(true);
    
    setTimeout(() => {
      const { response, suggestions } = getRecruitmentResponse(input);
      const botMessage = { 
        text: response, 
        sender: "bot",
        suggestions: suggestions
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    // Déclenche automatiquement l'envoi après 300ms
    setTimeout(() => {
      handleSend();
    }, 300);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>Assistant Recrutement</h3>
        <div className="status-dot"></div>
      </div>
      
      <div className="messages">
        {messages.map((msg, i) => (
          <React.Fragment key={i}>
            <div className={`message ${msg.sender}`}>
              {msg.text}
              {msg.sender === 'bot' && msg.suggestions?.length > 0 && (
                <div className="suggestions">
                  {msg.suggestions.map((suggestion, idx) => (
                    <button 
                      key={idx} 
                      className="suggestion-btn"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
        
        {isTyping && (
          <div className="message bot typing-indicator">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Posez votre question..."
        />
        <button 
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
        >
          <svg className="send-icon" viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SimpleChatbot;
import React, { useState, useRef, useEffect } from 'react';
import openai from './openaiConfig';
import styled from 'styled-components';

// Style du composant avec styled-components
const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  max-height: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  padding: 15px;
  background: #10a37f;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  cursor: pointer;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background: #f9f9f9;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
  background: ${props => props.role === 'user' ? '#e3f2fd' : '#f1f1f1'};
  align-self: ${props => props.role === 'user' ? 'flex-end' : 'flex-start'};
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #eee;
  background: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
`;

const SendButton = styled.button`
  margin-left: 10px;
  padding: 10px 15px;
  background: #10a37f;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:disabled {
    background: #ccc;
  }
`;

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  // Faire défiler vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Envoyer la conversation complète à OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: 'system', content: 'Vous êtes un assistant utile. Répondez en français.' },
          ...messages.map(msg => ({ role: msg.role, content: msg.content })),
          userMessage
        ],
        temperature: 0.7,
      });

      // Ajouter la réponse de l'assistant
      const assistantMessage = { 
        role: 'assistant', 
        content: completion.choices[0].message.content 
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Erreur OpenAI:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Désolé, une erreur s'est produite. Veuillez réessayer." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContainer>
      <ChatHeader onClick={() => setIsOpen(!isOpen)}>
        Assistant Virtuel
      </ChatHeader>
      
      {isOpen && (
        <>
          <ChatMessages>
            {messages.map((msg, index) => (
              <Message key={index} role={msg.role}>
                {msg.content}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </ChatMessages>
          
          <form onSubmit={handleSubmit}>
            <ChatInputContainer>
              <ChatInput
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tapez votre message..."
                disabled={isLoading}
              />
              <SendButton type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? '...' : 'Envoyer'}
              </SendButton>
            </ChatInputContainer>
          </form>
        </>
      )}
    </ChatContainer>
  );
};

export default Chatbot;
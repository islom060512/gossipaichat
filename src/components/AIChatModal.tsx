import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';

interface AIChatModalProps {
  conversationText: string;
}

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ conversationText }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const examplePrompts = [
    "Summarize the key takeaways from this conversation.",
    "What was the main emotion expressed by the other person?",
    "Can you find any subtle subtext or hidden meanings here?",
    "Provide advice based on the dynamics of this chat."
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: ChatMessage = { sender: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = `Based on the following conversation:
      \"${conversationText}\"
      
      User's question/statement: \"${userMessage.text}\"
      
      As an AI conversation assistant, respond to the user's question or statement in a helpful and concise manner, staying strictly within the context of the provided conversation. If the question is outside the scope of the conversation, politely state that you can only answer questions related to the conversation.`;
      
      const aiResponseText = await geminiService.chatWithConversation(prompt);
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponseText }]);
    } catch (error) {
      console.error('Error during AI chat:', error);
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, I could not process your request at the moment. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-800">AI Chat</h2>
          <p className="text-sm text-gray-500 mt-1">About: "{truncateText(conversationText, 50)}"</p>
        </div>
      </div>

      <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-hide max-h-96">
        {messages.length === 0 && !isLoading && (
          <div className="text-center text-gray-600 italic mt-10">
            <p className="mb-4">Ask me anything about the conversation!</p>
            <div className="flex flex-wrap justify-center gap-2 px-4">
              {examplePrompts.map((prompt, index) => (
                <button 
                  key={index} 
                  onClick={() => setInput(prompt)}
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors duration-200"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div 
              className={`max-w-[75%] p-3 rounded-xl shadow-md ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-xl rounded-bl-none animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 bg-white/80 backdrop-blur-sm flex items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10 bg-white/70"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || input.trim() === ''}
          className="ml-3 bg-purple-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AIChatModal; 
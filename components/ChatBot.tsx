import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, User, Bot, Calendar } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

declare global {
  interface Window {
    Calendly: any;
  }
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Armageddon's AI Assistant. Ask me about pricing, services, or how we can automate your business." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const openScheduling = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: 'https://calendly.com/armageddon-automation/seo-audit' }); 
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    
    // Add user message immediately
    const newMessages: ChatMessage[] = [
      ...messages, 
      { role: 'user', text: userMsg }
    ];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await generateChatResponse(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error("Chat error", error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] p-4 bg-orange-600 hover:bg-orange-500 text-white rounded-full shadow-lg shadow-orange-500/30 flex items-center justify-center transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[60] w-[90vw] md:w-[400px] h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Bot className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">AI Assistant</h3>
                <p className="text-slate-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Online • Powered by Gemini
                </p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-700' : 'bg-orange-600'}`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                  <div 
                    className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-slate-700 text-white rounded-tr-none' 
                        : 'bg-orange-900/50 text-slate-200 border border-orange-500/20 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                    {/* Heuristic check to show booking button in chat if context suggests it */}
                    {msg.role === 'model' && (msg.text.toLowerCase().includes('book') || msg.text.toLowerCase().includes('call')) && (
                       <button 
                         onClick={openScheduling}
                         className="mt-3 w-full py-2 bg-orange-600 hover:bg-orange-500 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                       >
                         <Calendar className="w-3 h-3" /> Schedule Call Now
                       </button>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-orange-900/50 p-3 rounded-2xl rounded-tl-none border border-orange-500/20">
                     <div className="flex gap-1">
                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-150"></span>
                     </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-slate-950 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about pricing, services..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User } from 'lucide-react';

interface Message {
  id: number;
  sender: 'visitor' | 'ai';
  text: string;
  delay: number;
}

const conversationScript: Message[] = [
  { id: 1, sender: 'visitor', text: 'I need a hair coloring appointment', delay: 800 },
  { id: 2, sender: 'ai', text: 'Perfect! I have Thursday at 2pm or Friday at 10am. Which works better for you?', delay: 2000 },
  { id: 3, sender: 'visitor', text: 'Thursday at 2pm works!', delay: 3500 },
  { id: 4, sender: 'ai', text: 'Great! What\'s your name and phone number?', delay: 5000 },
  { id: 5, sender: 'visitor', text: 'Sarah Chen, (555) 123-4567', delay: 6500 },
  { id: 6, sender: 'ai', text: '✓ Booked! Thursday 2pm for hair coloring. Confirmation will be texted to (555) 123-4567. See you soon!', delay: 8000 },
];

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < conversationScript.length) {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, conversationScript[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, conversationScript[currentIndex].delay);

      return () => clearTimeout(timer);
    } else {
      // Reset animation after all messages shown
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setCurrentIndex(0);
      }, 3000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentIndex]);

  return (
    <div className="glass-card p-6 hover:bg-white/10 transition-all duration-300 cyber-glow-purple">
      <h3 className="text-2xl font-bold mb-2 gradient-text">
        Lead Capture Chatbot
      </h3>
      <p className="text-gray-400 mb-6 text-sm">
        Watch our AI book appointments in real-time.
      </p>

      {/* Chat Window */}
      <div className="bg-cyber-gray rounded-2xl p-4 h-96 overflow-y-auto border border-white/5">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 mb-4 ${
                message.sender === 'visitor' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'ai'
                    ? 'bg-gradient-to-r from-cyber-cyan to-cyber-purple'
                    : 'bg-white/10'
                }`}
              >
                {message.sender === 'ai' ? (
                  <Bot className="w-5 h-5 text-black" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  message.sender === 'ai'
                    ? 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 border border-cyber-cyan/30'
                    : 'bg-white/10 border border-white/10'
                }`}
              >
                <p className="text-sm text-gray-100">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {currentIndex < conversationScript.length &&
          messages.length > 0 &&
          conversationScript[currentIndex]?.sender === 'ai' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-3 mb-4"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-r from-cyber-cyan to-cyber-purple">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div className="bg-gradient-to-r from-cyber-cyan/20 to-cyber-purple/20 border border-cyber-cyan/30 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-cyber-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span>Live Demo</span>
      </div>
    </div>
  );
}

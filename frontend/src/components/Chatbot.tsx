import React, { useState, useRef } from 'react';
import { api } from '@/api/client';
import { Send, Bot } from 'lucide-react';
import Shield from '/shield.svg';

const API_URL = '/chatbot';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = async () => {
    const question = input.trim();
    if (!question) return;
    setMessages(msgs => [...msgs, { sender: 'user', text: question }]);
    setInput('');
    setLoading(true);
    try {
      const res = await api(API_URL, {
        method: 'POST',
        body: JSON.stringify({ question }),
      }) as { answer?: string };
      setMessages(msgs => [...msgs, { sender: 'bot', text: res?.answer || 'Sorry, I could not answer that.' }]);
    } catch (e: any) {
      setMessages(msgs => [...msgs, { sender: 'bot', text: 'Sorry, I could not answer that.' }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        style={{ fontFamily: 'Poppins, sans-serif' }}
        onClick={() => setOpen(o => !o)}
        aria-label="Open Chatbot"
      >
        <Bot className="w-7 h-7 text-white" />
      </button>
      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-blue-100 flex flex-col font-poppins animate-fade-in">
          <div className="px-5 py-4 border-b border-blue-100 flex items-center justify-between">
            <span className="flex items-center gap-2 font-bold text-blue-600 text-lg">
              <Bot className="w-5 h-5" />
              SurakshaPath Chatbot
            </span>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-blue-600 text-xl font-bold">×</button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3" style={{ maxHeight: 320 }}>
            {messages.length === 0 && (
              <div className="text-gray-400 text-center text-sm">Ask me anything about disaster preparedness!</div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-2xl px-4 py-2 max-w-[75%] text-right font-poppins'
                      : 'bg-white border border-blue-200 text-blue-900 rounded-2xl px-4 py-2 max-w-[75%] text-left font-poppins'
                  }
                  style={{ boxShadow: msg.sender === 'bot' ? '0 2px 8px #e0e7ff' : undefined }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-blue-200 text-blue-900 rounded-2xl px-4 py-2 max-w-[75%] text-left font-poppins opacity-70">
                  ...
                </div>
              </div>
            )}
          </div>
          <div className="px-4 py-3 border-t border-blue-100 flex items-center gap-2 bg-blue-50 rounded-b-2xl">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 rounded-lg border border-blue-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 font-poppins"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              style={{ fontFamily: 'Poppins, sans-serif' }}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors disabled:opacity-50"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}


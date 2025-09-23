import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './Button';
import { Card, CardHeader, CardContent, CardTitle } from './Card';

export function ChatbotFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi! I can help you with disaster preparedness questions.' }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'I understand you have a question about safety. Let me help you with that.'
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-2xl">
          <CardHeader className="bg-primary text-white rounded-t-xl">
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Safety Assistant</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white/80"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white ml-auto' 
                      : 'bg-gray-100'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask a safety question..."
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button onClick={sendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          className="rounded-full w-14 h-14 shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const AIChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your Panorama Hotel assistant. How can I help you today?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(
                "https://api.groq.com/openai/v1/chat/completions",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "llama-3.3-70b-versatile",
                        messages: [
                            { role: "system", content: "You are a helpful assistant for Panorama Hotel." },
                            ...messages.map(msg => ({
                                role: msg.role === 'assistant' ? 'assistant' : 'user',
                                content: msg.content
                            })),
                            { role: "user", content: input }
                        ]
                    })
                }
            );

            const data = await response.json();
            const aiResponse = data?.choices?.[0]?.message?.content || "Sorry, I couldn't process that.";
            
            setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        } catch (error) {
            console.error("AI Chat Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-9999">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center bg-blue-600"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 transition-all duration-300 animate-in slide-in-from-bottom-5">
                    {/* Header */}
                    <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Bot size={24} />
                            <div>
                                <h3 className="font-semibold text-sm">Panorama AI Assistant</h3>
                                <p className="text-[10px] text-blue-100">Always online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}>
                                <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`mt-1 p-1 rounded-full shrink-0 ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                        {msg.role === 'user' ? <User size={14} className="text-blue-600" /> : <Bot size={14} className="text-gray-600" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm ${
                                        msg.role === 'user' 
                                        ? 'bg-blue-600 text-white rounded-tr-none' 
                                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start animate-in fade-in">
                                <div className="flex gap-2 max-w-[80%]">
                                    <div className="mt-1 p-1 rounded-full bg-gray-200 shrink-0">
                                        <Bot size={14} className="text-gray-600" />
                                    </div>
                                    <div className="p-3 rounded-2xl text-sm bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none flex items-center gap-2">
                                        <Loader2 size={16} className="animate-spin text-blue-600" />
                                        Thinking...
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type your message..."
                                className="flex-1 text-sm bg-gray-100 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-[10px] text-center text-gray-400 mt-2">Powered by Panorama AI</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIChatBot;

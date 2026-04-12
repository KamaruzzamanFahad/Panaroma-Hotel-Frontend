import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

const FREE_MODELS = [
    "deepseek/deepseek-chat:free",
    "x-ai/grok-4.1-fast:free",
    "stepfun/step-3.5-flash:free",
    "openai/gpt-oss-120b:free",
    "nvidia/nemotron-3-super-120b-a12b:free",
    "minimax/minimax-m2.5:free",
];

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

    const callWithFallback = async (conversationMessages) => {
        const apiKey = import.meta.env.VITE_OPEN_ROUTER_API_KEY;

        // Debug: confirm key is loaded
        console.log("API Key loaded:", apiKey ? `yes (starts with ${apiKey.slice(0, 8)}...)` : "NO KEY FOUND ❌");

        if (!apiKey) {
            throw new Error("API key missing. Check your .env file has VITE_OPEN_ROUTER_API_KEY set.");
        }

        for (const model of FREE_MODELS) {
            try {
                console.log(`Trying model: ${model}`);

                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                        'HTTP-Referer': window.location.origin,
                        'X-Title': 'Panorama Hotel Assistant'
                    },
                    body: JSON.stringify({
                        model,
                        messages: conversationMessages,
                    })
                });

                const data = await response.json();
                console.log(`[${model}] Status: ${response.status}`, data);

                if (data?.error) {
                    console.warn(`[${model}] Error:`, data.error.message);
                    continue;
                }

                const content = data?.choices?.[0]?.message?.content;
                if (!content) {
                    console.warn(`[${model}] Empty content`);
                    continue;
                }

                console.log(`✅ Success with: ${model}`);
                return content;

            } catch (err) {
                console.warn(`[${model}] Exception:`, err.message);
                continue;
            }
        }

        throw new Error("All models failed.");
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        const conversationMessages = [
            { role: "system", content: "You are a helpful assistant for Panorama Hotel." },
            ...updatedMessages.map(msg => ({ role: msg.role, content: msg.content }))
        ];

        try {
            const aiResponse = await callWithFallback(conversationMessages);
            setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
        } catch (error) {
            console.error("Final error:", error.message);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `❌ ${error.message}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-9999">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center"
            >
                {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </button>

            {isOpen && (
                <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 transition-all duration-300 animate-in slide-in-from-bottom-5">
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
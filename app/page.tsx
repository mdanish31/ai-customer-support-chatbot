// app/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';

export default function HomePage() {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState<{ message: string, response: string }[]>([]);

    const sendMessage = async (apiRoute: string) => {
        try {
            const { data } = await axios.post(apiRoute, { message: input });
            setChat([...chat, { message: input, response: data.response }]);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>AI Customer Support Chatbot</h1>
            <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px', maxHeight: '400px', overflowY: 'scroll' }}>
                {chat.map((c, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <p><strong>You:</strong> {c.message}</p>
                        <p><strong>Bot:</strong> {c.response}</p>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' ? sendMessage('/api/chat/hardcoded') : null} // Modify API route as needed
                placeholder="Type your message..."
                style={{ padding: '10px', width: '80%', marginRight: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
            />
            <button onClick={() => sendMessage('/api/chat/hardcoded')} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0070f3', color: '#fff', border: 'none' }}>
                Send (Hardcoded)
            </button>
            <button onClick={() => sendMessage('/api/chat/genAI')} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0070f3', color: '#fff', border: 'none', marginLeft: '10px' }}>
                Send (Gen-AI)
            </button>
            <button onClick={() => sendMessage('/api/chat/groq')} style={{ padding: '10px 20px', borderRadius: '5px', backgroundColor: '#0070f3', color: '#fff', border: 'none', marginLeft: '10px' }}>
                Send (Groq)
            </button>
        </div>
    );
}

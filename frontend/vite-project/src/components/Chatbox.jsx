import React, { useState } from 'react';
import { getGeminiResponse } from '../api';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSend = async () => {
        const aiResponse = await getGeminiResponse(input);
        setResponse(aiResponse);
    };

    return (
        <div className='chatbox'>
            <h2>Gemini AI Chatbot</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
            />
            <button onClick={handleSend}>Send</button>
            <p>Response: {response}</p>
        </div>
    );
};

export default Chatbot;

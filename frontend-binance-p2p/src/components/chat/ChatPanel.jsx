import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

const ChatPanel = ({ ad, onClose }) => {
    const [messages, setMessages] = useState([
        { from: 'system', text: `Estás comprando ${ad.amount} ${ad.currency.name} a ${ad.price} Bs.` },
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: 'user', text: input }]);
        setInput('');
    };

    const confirmPurchase = () => {
        alert('Compra confirmada. (Simulado)');
    };

    return (
        <div className="border rounded-xl p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">Chat de compra</h3>
            <Button size="sm" variant="ghost" onClick={onClose}>Cerrar</Button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 bg-gray-100 p-2 rounded">
            {messages.map((msg, idx) => (
            <div
                key={idx}
                className={`max-w-xs px-3 py-2 rounded-lg ${
                msg.from === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
                }`}
            >
                {msg.text}
            </div>
            ))}
        </div>

        <div className="mt-2 flex items-center gap-2">
            <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            />
            <Button onClick={sendMessage} size="icon"><Send className="h-4 w-4" /></Button>
        </div>

        <Button className="mt-4" onClick={confirmPurchase}>Confirmar Compra</Button>
        </div>
    );
};

export default ChatPanel;

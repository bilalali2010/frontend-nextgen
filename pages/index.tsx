import { useState, useEffect } from 'react';
import { sendMessage, uploadTexts } from '../lib/api';

export default function Home() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);
  const [pdfText, setPdfText] = useState('');
  const [adminMode, setAdminMode] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === '1') setAdminMode(true);
  }, []);

  const handleChatSubmit = async () => {
    if (!message) return;
    const res = await sendMessage(message);
    setChat([...chat, { user: message, bot: res.reply || 'No reply' }]);
    setMessage('');
  };

  const handleTextUpload = async () => {
    if (!pdfText) return;
    const texts = pdfText
      .split('\n\n')
      .map(t => t.trim())
      .filter(Boolean);
    const res = await uploadTexts(texts);
    alert(res.status || 'Uploaded');
    setPdfText('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">NEXTGEN Chatbot</h1>

      {adminMode && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Admin Dashboard</h2>
          <textarea
            className="w-full h-48 p-2 border border-gray-400 rounded mb-2"
            value={pdfText}
            onChange={e => setPdfText(e.target.value)}
            placeholder="Paste text from PDF or .txt file here..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleTextUpload}
          >
            Upload Text
          </button>
        </div>
      )}

      <div className="mb-4">
        <input
          className="w-full p-2 border border-gray-400 rounded"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Ask NEXTGEN anything..."
        />
        <button
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleChatSubmit}
        >
          Send
        </button>
      </div>

      <div className="space-y-4">
        {chat.map((c, idx) => (
          <div key={idx}>
            <p className="font-semibold">You: {c.user}</p>
            <p className="bg-gray-200 p-2 rounded">Bot: {c.bot}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

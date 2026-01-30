import { useState } from "react";
import { chat, uploadPDFs } from "../lib/api";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [admin, setAdmin] = useState(window.location.search.includes("admin=1"));
  const [pdfUrls, setPdfUrls] = useState("");

  const handleChat = async () => {
    const res = await chat(message);
    setReply(res.reply);
  };

  const handlePDFUpload = async () => {
    const urls = pdfUrls.split("\n").map(u => u.trim());
    const res = await uploadPDFs(urls);
    alert(res.status);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">NEXTGEN Chatbot</h1>

      {admin && (
        <div className="my-4">
          <h2 className="font-semibold">Admin PDF Upload</h2>
          <textarea
            rows={5}
            value={pdfUrls}
            onChange={e => setPdfUrls(e.target.value)}
            placeholder="Paste GitHub raw PDF URLs, one per line"
            className="border p-2 w-full"
          />
          <button onClick={handlePDFUpload} className="mt-2 p-2 bg-blue-600 text-white">
            Upload PDFs
          </button>
        </div>
      )}

      <div className="my-4">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Ask NEXTGEN..."
          className="border p-2 w-full"
        />
        <button onClick={handleChat} className="mt-2 p-2 bg-green-600 text-white">
          Send
        </button>
      </div>

      {reply && (
        <div className="mt-4 p-2 border bg-gray-100">
          <strong>Reply:</strong> {reply}
        </div>
      )}
    </div>
  );
}

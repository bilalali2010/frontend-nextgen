import { useState } from "react";
import { uploadPDF, chatWithAI } from "../lib/api";

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<string[]>([]);
  const [status, setStatus] = useState("");

  const isAdmin =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("admin") === "1";

  async function handleUpload() {
    if (!files.length) return alert("Select PDF files");

    try {
      setStatus("Uploading PDFs...");
      await uploadPDF(files);
      setStatus("✅ PDFs indexed successfully");
    } catch (e: any) {
      setStatus("❌ Upload failed");
    }
  }

  async function handleChat() {
    if (!message.trim()) return;

    const userMsg = `🧑‍💻 You: ${message}`;
    setChatLog(prev => [...prev, userMsg]);
    setMessage("");
    setStatus("Thinking...");

    try {
      const res = await chatWithAI(message);
      const aiMsg = `🤖 NEXTGEN: ${res.answer || "No response"}`;
      setChatLog(prev => [...prev, aiMsg]);
      setStatus("");
    } catch {
      setStatus("❌ Backend error");
    }
  }

  return (
    <div className="container">
      {isAdmin && (
        <div className="admin-bar">
          🔐 Admin Mode (Knowledge Upload Enabled)
        </div>
      )}

      <h1>NEXTGEN AI Assistant</h1>

      {isAdmin && (
        <section className="card">
          <h2>📄 Upload Knowledge PDFs</h2>
          <input
            type="file"
            accept=".pdf"
            multiple
            onChange={(e) =>
              setFiles(Array.from(e.target.files || []))
            }
          />
          <button onClick={handleUpload}>Upload & Index</button>
        </section>
      )}

      <section className="card">
        <h2>💬 Ask AI (OpenRouter)</h2>
        <textarea
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleChat}>Send</button>
      </section>

      {status && <p className="status">{status}</p>}

      <section className="chat-box">
        {chatLog.map((msg, i) => (
          <div key={i} className="chat-line">
            {msg}
          </div>
        ))}
      </section>
    </div>
  );
}

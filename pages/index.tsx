import { useState } from "react";
import { sendMessage, uploadFile } from "../lib/api";

export default function Home() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleChat = async () => {
    const res = await sendMessage(message);
    setReply(res.reply);
  };

  const handleUpload = async () => {
    if (!file) return alert("Select a file");
    await uploadFile(file);
    alert("File uploaded");
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>NEXTGEN AI</h1>

      <textarea
        placeholder="Ask NextGen..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={handleChat}>Send</button>

      <p><strong>Reply:</strong> {reply}</p>

      <hr />

      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <br />
      <button onClick={handleUpload}>Upload File</button>
    </main>
  );
}

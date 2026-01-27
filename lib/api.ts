const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function uploadPDF(files: File[]) {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));

  const res = await fetch(`${BACKEND}/upload`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

export async function chatWithAI(message: string) {
  const res = await fetch(`${BACKEND}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

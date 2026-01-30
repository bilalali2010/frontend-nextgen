const API_URL = "https://nextgen-backend.bilalali092010.workers.dev";

export async function chat(message: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

export async function uploadPDFs(urls: string[]) {
  const res = await fetch(`${API_URL}/?admin=1`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pdfs: urls }),
  });
  return res.json();
}

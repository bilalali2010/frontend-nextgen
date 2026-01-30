export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function sendMessage(message: string) {
  const res = await fetch(API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

export async function uploadTexts(texts: string[]) {
  const res = await fetch(`${API_URL}/?admin=1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ texts }),
  });
  return res.json();
}

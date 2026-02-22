export async function fetchFruits() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const res = await fetch(`${BASE_URL}/fruits/all`);

  if (!res.ok) {
    throw new Error('Failed to fetch fruits');
  }

  const data = await res.json();
  return data; // make sure your API returns an array of fruits
}


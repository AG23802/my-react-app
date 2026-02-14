export async function fetchFruits() {
  const res = await fetch('http://localhost:5000/api/external-data');

  if (!res.ok) {
    throw new Error('Failed to fetch fruits');
  }

  const data = await res.json();
  return data; // make sure your API returns an array of fruits
}

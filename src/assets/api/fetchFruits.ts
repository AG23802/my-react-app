export async function fetchFruits() {
  const res = await fetch('http://localhost:8080/api/v1/fruits/all');

  if (!res.ok) {
    throw new Error('Failed to fetch fruits');
  }

  const data = await res.json();
  return data; // make sure your API returns an array of fruits
}

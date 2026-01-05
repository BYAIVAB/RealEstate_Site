// Example real estate API integration using fetch
// BASE_URL must be a valid API endpoint that returns JSON.
const BASE_URL = 'https://b494fa8cfd5e47c6bed3758cb32486db'; // <-- Actual API endpoint
const API_KEY = ''; // If needed, add your API key here

export async function fetchProperties(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') query.set(key, String(value));
  });
  const url = `${BASE_URL}/properties?${query.toString()}`;
  const res = await fetch(url);
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error('API response was not valid JSON:', text);
    throw new Error('API did not return valid JSON. Check BASE_URL and endpoint.');
  }
}

export async function fetchPropertyById(id: string) {
  const url = `${BASE_URL}/properties/${id}`;
  const res = await fetch(url);
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    return data;
  } catch (err) {
    console.error('API response was not valid JSON:', text);
    throw new Error('API did not return valid JSON. Check BASE_URL and endpoint.');
  }
}

// Add more API methods as needed (cities, types, agents, etc.)
// If your API requires the key in headers, use:
// fetch(url, { headers: { 'Authorization': `Bearer ${API_KEY}` } })

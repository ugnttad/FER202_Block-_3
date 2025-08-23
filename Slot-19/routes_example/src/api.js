const API_URL = process.env.REACT_APP_API_URL || '';

export async function fetchPosts() {
  const url = API_URL ? `${API_URL}/posts` : '/posts.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function fetchPostById(id) {
  const url = API_URL ? `${API_URL}/posts/${id}` : '/posts.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (API_URL) return data; // json-server returns a single object
  return data.find(p => String(p.id) === String(id));
}

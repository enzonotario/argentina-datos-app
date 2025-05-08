const baseUrl = 'https://api.argentinadatos.com';

export function useApi() {
  const buildUrl = (path) => `${baseUrl}${path}`;

  const fetchJson = async (url) => {
    const response = await fetch(buildUrl(url));
    if (!response.ok) throw new Error(`fetch failed: ${response.status}`);
    return response.json();
  };

  return {
    fetchJson,
  };
}

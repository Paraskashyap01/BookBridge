const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default apiUrl;

export const buildApiUrl = (path) => {
  if (!path) return apiUrl;
  return `${apiUrl}${path.startsWith('/') ? path : `/${path}`}`;
};


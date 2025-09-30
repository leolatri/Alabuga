export const API = (import.meta as any)?.env?.VITE_API_BASE || process.env.REACT_APP_API_BASE || '/api';

export function getUserIdForEndpoint(url: string): string {
  const eduUserId = localStorage.getItem('eduUserId') || '1';
  const hrUserId = localStorage.getItem('hrUserId') || 'a1b2c3d4-1234-5678-90ab-cdef12345678';
  
  if (url.startsWith('/edu')) {
    return eduUserId; 
  } else {
    return hrUserId; 
  }
}

function headers(extra: Record<string, string> = {}): HeadersInit {
  return {
    'Content-Type': 'application/json',
    ...extra
  };
}

async function baseRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const needsUserId = !url.includes('/store') && !url.includes('/missions') || 
                     options.method === 'POST' || options.method === 'PUT';
  
  const requestHeaders = needsUserId 
    ? { ...headers(), 'X-User-Id': getUserIdForEndpoint(url) }
    : headers();

  const config = {
    ...options,
    headers: {
      ...requestHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(`${API}${url}`, config);
  if (!response.ok) throw new Error(await response.text());
  
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  return response.text() as T;
}

export const apiClient = {
  get: <T>(url: string): Promise<T> => baseRequest<T>(url),
  post: <T>(url: string, body?: any): Promise<T> => 
    baseRequest<T>(url, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(url: string, body?: any): Promise<T> => 
    baseRequest<T>(url, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(url: string): Promise<T> => baseRequest<T>(url, { method: 'DELETE' }),
};
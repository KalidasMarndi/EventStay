const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export class ApiError extends Error {
  public status: number;
  public data: any;
  
  constructor(status: number, data: any) {
    super(data.message || 'An API error occurred');
    this.status = status;
    this.data = data;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}, token?: string | null): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData = {};
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }
    throw new ApiError(response.status, errorData);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string, token?: string | null) => request<T>(endpoint, { method: 'GET' }, token),
  post: <T>(endpoint: string, body: any, token?: string | null) => request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) }, token),
  put: <T>(endpoint: string, body: any, token?: string | null) => request<T>(endpoint, { method: 'PUT', body: JSON.stringify(body) }, token),
  delete: <T>(endpoint: string, token?: string | null) => request<T>(endpoint, { method: 'DELETE' }, token),
};

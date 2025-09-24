const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Mock data for development when backend is not available
const MOCK_ENABLED = (import.meta as any).env?.VITE_USE_MOCK !== 'false';
const MOCK_DELAY = 800; // Simulate network delay

const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@sih.test', role: 'admin', region: 'MH' },
  { id: 2, name: 'Student 1', email: 'student1@sih.test', role: 'student', region: 'MH' },
  { id: 3, name: 'Student 2', email: 'student2@sih.test', role: 'student', region: 'DL' },
];

// Mock API handler
async function mockApi(path: string, opts: RequestInit = {}) {
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  // Parse request body if present
  let body = {};
  if (opts.body) {
    try {
      body = JSON.parse(opts.body.toString());
    } catch (e) {
      console.error('Failed to parse request body', e);
    }
  }
  
  // Handle different API endpoints
  if (path === '/auth/login' && opts.method === 'POST') {
    const { email, password } = body as { email: string; password: string };
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (user && (password === 'Admin@123' || password === 'Student@123')) {
      return {
        user,
        access_token: 'mock-jwt-token-' + user.role,
      };
    }
    throw new Error('Invalid credentials');
  }
  
  if (path === '/auth/register' && opts.method === 'POST') {
    const { email } = body as { email: string };
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    return { success: true };
  }

  if (path === '/chatbot' && opts.method === 'POST') {
    const { question } = body as { question: string };
    const q = (question || '').toLowerCase();
    if (q.includes('earthquake')) return { question, answer: 'Drop, Cover, Hold', score: 0.9 };
    if (q.includes('flood')) return { question, answer: 'Move to higher ground', score: 0.8 };
    if (q.includes('fire')) return { question, answer: 'Stop, Drop, Roll', score: 0.85 };
    return { question, answer: 'Stay calm and ensure personal safety first.', score: 0.5 };
  }
  
  // Default response for unhandled endpoints
  console.warn('Unhandled mock API call:', path, opts);
  return { mock: true, path, method: opts.method };
}

export async function api(path: string, opts: RequestInit = {}) {
  // Use mock API if enabled
  if (MOCK_ENABLED) {
    try {
      return await mockApi(path, opts);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Mock API error');
    }
  }
  
  // Real API call
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(opts.headers as Record<string, string> || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`${base}${path}`, { ...opts, headers });
    if (!res.ok) throw new Error((await res.text()) || 'Request failed');
    const text = await res.text();
    try { return text ? JSON.parse(text) : {}; } catch { return text; }
  } catch (error) {
    console.error('API call failed:', path, error);
    throw error;
  }
}


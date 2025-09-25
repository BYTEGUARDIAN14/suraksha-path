const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Mock data for development when backend is not available
const MOCK_ENABLED = (import.meta as any).env?.VITE_USE_MOCK !== 'false';
const MOCK_DELAY = 800; // Simulate network delay

const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@sih.test', role: 'admin', region: 'MH' },
  { id: 2, name: 'Student 1', email: 'student1@sih.test', role: 'student', region: 'MH' },
  { id: 3, name: 'Student 2', email: 'student2@sih.test', role: 'student', region: 'DL' },
];

const MOCK_PREPAREDNESS = {
  preparedness_score: 75,
  drills_completed: 8,
  quizzes_passed: 12,
  last_updated: new Date().toISOString(),
  categories: {
    earthquake: 85,
    flood: 70,
    fire: 80,
    general: 75
  }
};

const MOCK_LEADERBOARD = [
  { id: 1, name: 'Admin User', score: 95, role: 'admin' },
  { id: 2, name: 'Student 1', score: 85, role: 'student' },
  { id: 3, name: 'Student 2', score: 78, role: 'student' },
  { id: 4, name: 'Demo Student', score: 72, role: 'student' },
  { id: 5, name: 'Test User', score: 68, role: 'student' }
];

const MOCK_ALERTS = [
  {
    id: 1,
    title: 'Earthquake Drill Scheduled',
    message: 'A mandatory earthquake drill is scheduled for tomorrow at 10:00 AM. Please review the safety procedures.',
    type: 'drill',
    priority: 'high',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    region: 'MH'
  },
  {
    id: 2,
    title: 'Flood Safety Reminder',
    message: 'With monsoon season approaching, please review flood safety guidelines and emergency contacts.',
    type: 'reminder',
    priority: 'medium',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    region: 'MH'
  },
  {
    id: 3,
    title: 'New Safety Resources Available',
    message: 'Updated emergency preparedness guides are now available in the resources section.',
    type: 'info',
    priority: 'low',
    created_at: new Date(Date.now() - 259200000).toISOString(),
    region: 'MH'
  }
];

const MOCK_QUIZZES = [
  {
    id: 1,
    title: 'Earthquake Preparedness Quiz',
    description: 'Test your knowledge of earthquake safety procedures',
    questions: [
      {
        id: 1,
        question: 'What is the first thing you should do during an earthquake?',
        options: ['Run outside', 'Drop, Cover, and Hold', 'Call emergency services', 'Hide under a table'],
        correct_answer: 1
      }
    ]
  }
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

  // Preparedness endpoint
  if (path === '/preparedness') {
    return MOCK_PREPAREDNESS;
  }

  // Leaderboard endpoint
  if (path === '/leaderboard') {
    return MOCK_LEADERBOARD;
  }

  // Alerts endpoint
  if (path === '/alerts') {
    return MOCK_ALERTS;
  }

  // Scores endpoint
  if (path === '/scores/me') {
    return [
      { id: 1, quiz_id: 1, score: 85, completed_at: new Date().toISOString() },
      { id: 2, quiz_id: 2, score: 92, completed_at: new Date().toISOString() }
    ];
  }

  // Quizzes endpoint
  if (path === '/quizzes') {
    return MOCK_QUIZZES;
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


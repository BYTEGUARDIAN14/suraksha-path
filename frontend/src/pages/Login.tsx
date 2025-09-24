import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, CheckCircle, ArrowRightCircle } from 'lucide-react';
import { api } from '@/api/client';
import { useAuth } from '@/state/auth';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { Container } from '@/components/layout/Container';
// @ts-ignore
import SurakshaLogo from '../assets/WhatsApp-Image-2025-09-09-at-20.33.33_d0915ebd.svg';
import { useTranslation } from '@/state/i18n';

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const t = useTranslation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      login(res.user, res.access_token);
      nav(res.user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } catch (e: any) {
      setError(e.message || t['login_error'] || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <Card className="hidden lg:block shadow-lg border-0 bg-gradient-to-br from-blue-600 to-blue-500 text-white">
              <CardHeader>
                <img src={SurakshaLogo} alt="Suraksha Path Logo" className="w-16 h-16 rounded-xl object-contain" />
                <CardTitle className="text-3xl font-extrabold">Suraksha Path</CardTitle>
                <CardDescription className="text-blue-100">India's Disaster Awareness Platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-white" /> Interactive learning & virtual drills</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-white" /> Region‑aware alerts and resources</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-white" /> Analytics to track preparedness</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-blue-100">
              <CardHeader className="text-center">
                <img src={SurakshaLogo} alt="Suraksha Path Logo" className="mx-auto mb-4 w-14 h-14 rounded-full object-contain" />
                <CardTitle className="text-3xl font-extrabold font-poppins text-gray-900">
                  <span className="text-blue-700">{t['login_title'] || 'Welcome Back'}</span>
                </CardTitle>
                <CardDescription className="text-base">{t['login_desc'] || 'Sign in to your Suraksha Path account to continue'}</CardDescription>
              </CardHeader>
              <CardContent>
              {error && (
                <Alert
                  variant="error"
                  title={t['login_error_title'] || 'Login Error'}
                  className="mb-6"
                  onClose={() => setError(null)}
                >
                  {error}
                </Alert>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t['login_email'] || 'Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder={t['login_email_placeholder'] || 'you@example.com'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    {t['login_password'] || 'Password'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder={t['login_password_placeholder'] || '••••••••'}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-blue-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      {t['login_remember'] || 'Remember me'}
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-primary hover:text-primary-hover">
                      {t['login_forgot'] || 'Forgot password?'}
                    </a>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 text-base" isLoading={isLoading}>
                  {t['login_btn'] || 'Sign in'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {t['login_no_account'] || "Don't have an account?"}{' '}
                  <Link to="/register" className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary-hover">
                    {t['login_signup'] || 'Sign up now'} <ArrowRightCircle className="w-4 h-4" />
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}


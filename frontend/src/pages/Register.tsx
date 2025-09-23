import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, MapPin, School, CheckCircle } from 'lucide-react';
import { api } from '@/api/client';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { Container } from '@/components/layout/Container';
import SurakshaLogo from '@/assets/WhatsApp-Image-2025-09-09-at-20.33.33_d0915ebd.svg';
import { useTranslation } from '@/state/i18n';

export default function Register() {
  const nav = useNavigate();
  const t = useTranslation();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<'student' | 'admin'>('student');
  const [region, setRegion] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role, region })
      });
      nav('/login');
    } catch (e: any) {
      setError(e.message || t['register_error'] || 'Registration failed. Please try again.');
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
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-white" /> Bilingual UI (English/Hindi)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-white" /> Student & Admin roles</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 mt-0.5 text-white" /> Region‑aware drills & alerts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-blue-100">
              <CardHeader className="text-center">
                <img src={SurakshaLogo} alt="Suraksha Path Logo" className="mx-auto mb-4 w-14 h-14 rounded-full object-contain" />
                <CardTitle className="text-3xl font-extrabold font-poppins text-gray-900">{t['register_title'] || 'Create an Account'}</CardTitle>
                <CardDescription className="text-base">{t['register_desc'] || 'Join Suraksha Path for disaster preparedness'}</CardDescription>
              </CardHeader>
              <CardContent>
              {error && (
                <Alert
                  variant="error"
                  title={t['register_error_title'] || 'Registration Error'}
                  className="mb-6"
                  onClose={() => setError(null)}
                >
                  {error}
                </Alert>
              )}
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t['register_name'] || 'Full Name'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder={t['register_name_placeholder'] || 'John Doe'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t['register_email'] || 'Email Address'}
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
                      placeholder={t['register_email_placeholder'] || 'you@example.com'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    {t['register_password'] || 'Password'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder={t['register_password_placeholder'] || '••••••••'}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {t['register_password_hint'] || 'Password must be at least 8 characters long'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                      {t['register_role'] || 'Role'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <School className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value as 'student' | 'admin')}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      >
                        <option value="student">{t['register_role_student'] || 'Student'}</option>
                        <option value="admin">{t['register_role_admin'] || 'Administrator'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                      {t['register_region'] || 'Region Code'}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="region"
                        name="region"
                        type="text"
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder={t['register_region_placeholder'] || 'MH, DL, KA'}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    {t['register_terms'] || <>I agree to the{' '}<a href="#" className="font-medium text-primary hover:text-primary-hover">Terms of Service</a>{' '}and{' '}<a href="#" className="font-medium text-primary hover:text-primary-hover">Privacy Policy</a></>}
                  </label>
                </div>

                <Button type="submit" className="w-full h-12 text-base" isLoading={isLoading}>
                  {t['register_btn'] || 'Create Account'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  {t['register_already'] || 'Already have an account?'}{' '}
                  <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
                    {t['register_signin'] || 'Sign in'}
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


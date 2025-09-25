import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  Bell,
  Phone,
  BarChart3,
  Bot,
  ArrowRight,
  Users,
  School,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/layout/Container';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { LineChart } from '@/components/dashboard/LineChart';
// @ts-ignore
import earthquakeIllustration from '../assets/illustrations/earthquake.svg';
// @ts-ignore
import floodIllustration from '../assets/illustrations/flood.svg';
// @ts-ignore
import fireIllustration from '../assets/illustrations/fire.svg';
// @ts-ignore
import drillIllustration from '../assets/illustrations/drill.svg';
// @ts-ignore
import SurakshaLogo from '../assets/WhatsApp-Image-2025-09-09-at-20.33.33_d0915ebd.svg';
import { useI18n, useTranslation } from '@/state/i18n';
import React from 'react';

const features = [
  {
    icon: BookOpen,
    title: 'feature_quizzes',
    description: 'feature_quizzes_desc',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Target,
    title: 'feature_drills',
    description: 'feature_drills_desc',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: Bell,
    title: 'feature_alerts',
    description: 'feature_alerts_desc',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Phone,
    title: 'feature_contacts',
    description: 'feature_contacts_desc',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    icon: BarChart3,
    title: 'feature_analytics',
    description: 'feature_analytics_desc',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Bot,
    title: 'feature_chatbot',
    description: 'feature_chatbot_desc',
    color: 'text-pink-500',
    bgColor: 'bg-pink-50'
  }
];

const chartData = [
  { month: 'Jan', students: 2000, drills: 150 },
  { month: 'Feb', students: 3000, drills: 220 },
  { month: 'Mar', students: 4500, drills: 340 },
  { month: 'Apr', students: 6000, drills: 460 },
  { month: 'May', students: 8000, drills: 580 },
  { month: 'Jun', students: 10000, drills: 750 }
];

export default function Homepage() {
  const navigate = useNavigate();
  const t = useTranslation();
  const { lang } = useI18n();
  // Move hooks to top level
  const [students, setStudents] = React.useState(0);
  const [schools, setSchools] = React.useState(0);
  const [drills, setDrills] = React.useState(0);
  React.useEffect(() => {
    let s = 0, sc = 0, d = 0;
    const interval = setInterval(() => {
      if (s < 10000) setStudents(s += 200);
      if (sc < 500) setSchools(sc += 10);
      if (d < 1500) setDrills(d += 30);
    }, 20);
    setTimeout(() => clearInterval(interval), 1200);
    return () => clearInterval(interval);
  }, []);

  if (!t || Object.keys(t).length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white font-poppins">
      {/* Hero Section */}
      <section className="relative pt-16 pb-8 md:pt-20 md:pb-10 lg:pt-24 lg:pb-12 overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse" />
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="will-change-transform order-1 lg:order-1"
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {/* Removed mini brand pill per request */}
              {lang === 'en' ? (
                <>
                  <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold font-poppins mb-4 md:mb-6 text-gray-900 leading-tight">
                    <span className="text-blue-700">Build</span> Prepared,
                    <br />
                    <span className="text-blue-700">Stay</span> Safe
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 md:mb-8 max-w-2xl font-poppins">
                    <span className="text-blue-700 font-semibold">Comprehensive</span> disaster preparedness training for Indian schools and colleges.
                    <span className="text-blue-700 font-semibold"> Interactive learning</span>, virtual drills, and
                    <span className="text-blue-700 font-semibold"> real‑time alerts</span> to build safer campuses.
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-poppins mb-4 md:mb-6 text-gray-900 leading-tight">
                    {t['title']}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 md:mb-8 max-w-2xl font-poppins">
                    {t['desc']}
                  </p>
                </>
              )}
              <div className="flex flex-wrap gap-4 mb-8 md:mb-10">
                <Button size="lg" className="text-lg px-8 py-4" onClick={() => navigate('/login')}>
                  {t['btn1'] || 'Start Learning'}
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                  onClick={() => {
                    const el = document.getElementById('features');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      window.location.href = '/#features';
                    }
                  }}
                >
                  {t['learnMore'] || 'Learn More'}
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 mt-8">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">{students.toLocaleString()}</span>
                  <span className="text-gray-600 text-sm">{t['studentsTrained'] || 'Students Trained'}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-green-600">{schools.toLocaleString()}</span>
                  <span className="text-gray-600 text-sm">{t['schoolsProtected'] || 'Schools Protected'}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-orange-500">{drills.toLocaleString()}</span>
                  <span className="text-gray-600 text-sm">{t['drillsCompleted'] || 'Drills Completed'}</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative will-change-transform order-2 lg:order-2 mt-2 md:mt-0 lg:-mt-10"
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-[38vh] md:h-[46vh] lg:h-[58vh] flex items-center justify-center">
                <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-blue-100 via-white to-blue-50 blur-2xl" />
                <img
                  src={SurakshaLogo}
                  alt="Suraksha Path logo"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{ filter: 'invert(23%) sepia(93%) saturate(3566%) hue-rotate(213deg) brightness(88%) contrast(105%)' }}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* About SurakshaPath Section – preserve original theme with blue highlights in both languages */}
      <section className="py-16 bg-white font-poppins">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-blue-600">{(t['about_prefix'] || 'About')}</span> <span className="text-gray-900">SurakshaPath</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-blue-600 font-semibold">{t['about_brand'] || 'SurakshaPath'}</span> {t['about_body'] || ''} <span className="text-blue-600 font-semibold">{t['about_quizzes'] || 'interactive quizzes'}</span>, <span className="text-blue-600 font-semibold">{t['about_gamified'] || 'gamified learning'}</span>, {t['about_and'] || 'and'} <span className="text-blue-600 font-semibold">{t['about_drills'] || 'virtual drills'}</span>. {t['about_second'] || ''} <span className="text-blue-600 font-semibold">{t['about_alerts'] || 'region-specific alerts'}</span>, <span className="text-blue-600 font-semibold">{t['about_resources'] || 'multilingual resources'}</span>, {t['about_and']} <span className="text-blue-600 font-semibold">{t['about_contacts'] || 'quick access to emergency contacts'}</span>. {t['about_third'] || ''} <span className="text-blue-600 font-semibold">{t['about_dashboards'] || 'dashboards and analytics'}</span> {t['about_tail'] || ''}
            </p>
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">{t['features'] || 'Features'}</Badge>
            <h2 className="text-4xl font-bold font-poppins mb-4">
              {t['compSafety'] || 'Comprehensive Safety Solution'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t['compDesc'] || 'Everything your institution needs to build a culture of safety and emergency preparedness.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="will-change-transform"
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle>{t[feature.title] || feature.title}</CardTitle>
                    <CardDescription>{t[feature.description] || feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link to={`/features/${feature.title.replace('feature_', '')}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 group">
                      {t['learnMore'] || 'Learn More'}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">{t['impact'] || 'Impact'}</Badge>
            <h2 className="text-4xl font-bold font-poppins mb-4">
              {t['makingSafer'] || 'Making Schools Safer'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t['impactDesc'] || 'Track our progress in building safer educational communities.'}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard
              title={t['studentsTrained'] || 'Students Trained'}
              value="10,000+"
              icon={<Users className="w-6 h-6 text-primary" />}
              trend={{ value: 27, direction: 'up', label: 'vs last month' }}
            />
            <StatsCard
              title={t['schoolsProtected'] || 'Schools Protected'}
              value="500+"
              icon={<School className="w-6 h-6 text-primary" />}
              trend={{ value: 12, direction: 'up', label: 'vs last month' }}
            />
            <StatsCard
              title={t['drillsCompleted'] || 'Drills Completed'}
              value="1,500+"
              icon={<Target className="w-6 h-6 text-primary" />}
              trend={{ value: 32, direction: 'up', label: 'vs last month' }}
            />
            <StatsCard
              title={t['safetyScore'] || 'Safety Score'}
              value="98%"
              icon={<Shield className="w-6 h-6 text-primary" />}
              trend={{ value: 8, direction: 'up', label: 'vs last month' }}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t['platformGrowth'] || 'Platform Growth'}</CardTitle>
              <CardDescription>{t['platformDesc'] || 'Students trained and drills conducted'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <LineChart
                  data={chartData}
                  lines={[
                    { key: 'students', name: t['studentsTrained'] || 'Students Trained', color: '#2563EB' },
                    { key: 'drills', name: t['drillsCompleted'] || 'Drills Completed', color: '#10B981' }
                  ]}
                  xAxisKey="month"
                />
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <Container>
          <Card className="bg-primary text-white">
            <CardContent className="py-12">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold font-poppins mb-6">
                  {t['cta'] || 'Ready to Build a Safer Campus?'}
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                  {t['ctaDesc'] || 'Join thousands of institutions already using our platform to protect their communities.'}
                </p>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-blue-50"
                  onClick={() => navigate('/register')}
                >
                  {t['ctaBtn'] || 'Get Started Now'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}

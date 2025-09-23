import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Bell, CheckCircle, Award, ArrowRight, Sparkles, FileText, LogOut } from 'lucide-react';
import { useAuth } from '@/state/auth';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { useTranslation } from '@/state/i18n';
import { api } from '@/api/client';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const t = useTranslation();
  const [preparedness, setPreparedness] = React.useState<number>(0);
  const [leaderboard, setLeaderboard] = React.useState<any[]>([]);
  const [alerts, setAlerts] = React.useState<any[]>([]);

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        const p = await api('/preparedness');
        const lb = await api('/leaderboard');
        const al = await api('/alerts');
        if (!active) return;
        setPreparedness(Number(p?.preparedness_score ?? 0));
        setLeaderboard(lb || []);
        setAlerts(al || []);
      } catch {}
    })();
    return () => { active = false; };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome + Quick Actions */}
          <div className="mb-8 grid lg:grid-cols-3 gap-6 items-stretch">
            <Card className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="inline-flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-blue-100 text-sm">{user?.region ? `Region: ${user.region}` : 'Suraksha Path'}</span>
                  </div>
                  <Button onClick={logout} className="h-9 px-3 bg-white/10 hover:bg-white/20 text-white border border-white/30" variant="secondary">
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </Button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold font-poppins">{t['student_welcome'] || `Welcome, ${user?.name || 'Student'}!`}</h1>
                    <p className="text-blue-100">{t['student_dashboard_desc'] || 'Your disaster preparedness dashboard'}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/student/quiz"><Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50"><BookOpen className="w-4 h-4 mr-2" /> Quiz</Button></Link>
                    <Link to="/student/drill-instructions"><Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50"><Target className="w-4 h-4 mr-2" /> Drills</Button></Link>
                    <Link to="/student/tracker"><Button variant="secondary" className="bg-white text-blue-700 hover:bg-blue-50"><Award className="w-4 h-4 mr-2" /> Tracker</Button></Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Preparedness Score</CardTitle>
                <CardDescription>Overall readiness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-sm">{Math.round(preparedness)}%</div>
                <Progress value={preparedness} max={100} variant="primary" />
                <Link to="/student/tracker" className="mt-3 inline-flex items-center gap-1 text-blue-700 text-sm">View details <ArrowRight className="w-4 h-4" /></Link>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title={t['student_quizzes_completed'] || 'Quizzes Completed'}
              value="3/5"
              icon={<BookOpen className="w-6 h-6 text-primary" />}
              trend={{ value: 60, direction: 'up', label: t['student_completion'] || 'completion' }}
            />
            <StatsCard
              title={t['student_drills_participated'] || 'Drills Participated'}
              value="2/3"
              icon={<Target className="w-6 h-6 text-primary" />}
              trend={{ value: 66, direction: 'up', label: t['student_completion'] || 'completion' }}
            />
            <StatsCard
              title={t['student_safety_score'] || 'Safety Score'}
              value="82%"
              icon={<Award className="w-6 h-6 text-primary" />}
              trend={{ value: 12, direction: 'up', label: t['student_vs_last_month'] || 'vs last month' }}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>{t['student_upcoming_drills'] || 'Upcoming Drills'}</CardTitle>
                <CardDescription>{t['student_upcoming_drills_desc'] || 'Scheduled safety drills for your region'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="primary">{t['student_earthquake'] || 'Earthquake'}</Badge>
                        <span className="text-sm text-gray-500">Sep 15, 2025</span>
                      </div>
                      <h3 className="font-medium mt-1">{t['student_earthquake_drill'] || 'Earthquake Safety Drill'}</h3>
                      <p className="text-sm text-gray-600">{t['student_earthquake_desc'] || 'Learn drop, cover, and hold procedures'}</p>
                    </div>
                    <Link to="/student/drill-instructions"><Button>{t['student_view_details'] || 'View Details'}</Button></Link>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="warning">{t['student_fire'] || 'Fire'}</Badge>
                        <span className="text-sm text-gray-500">Oct 5, 2025</span>
                      </div>
                      <h3 className="font-medium mt-1">{t['student_fire_drill'] || 'Fire Evacuation Drill'}</h3>
                      <p className="text-sm text-gray-600">{t['student_fire_desc'] || 'Practice safe evacuation routes'}</p>
                    </div>
                    <Link to="/student/drill-instructions"><Button>{t['student_view_details'] || 'View Details'}</Button></Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t['student_recent_alerts'] || 'Recent Alerts'}</CardTitle>
                <CardDescription>{t['student_recent_alerts_desc'] || 'Important safety notifications'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.slice(0,3).map((a:any, i:number) => (
                    <div key={i} className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">{a.disaster_type || 'Advisory'}</span>
                        <span className="text-xs text-gray-500 ml-auto">{new Date(a.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-600">{a.message}</p>
                    </div>
                  ))}
                  {alerts.length === 0 && (
                    <div className="p-4 border rounded-lg text-sm text-gray-600">No alerts yet.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t['student_progress'] || 'Your Preparedness Progress'}</CardTitle>
              <CardDescription>{t['student_progress_desc'] || 'Track your disaster readiness journey'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t['student_earthquake_preparedness'] || 'Earthquake Preparedness'}</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} max={100} variant="primary" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t['student_flood_safety'] || 'Flood Safety'}</span>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <Progress value={70} max={100} variant="primary" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{t['student_fire_safety'] || 'Fire Safety'}</span>
                    <span className="text-sm font-medium">90%</span>
                  </div>
                  <Progress value={90} max={100} variant="primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard teaser + Resources */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Leaderboard</CardTitle>
                <CardDescription>Top performers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.slice(0,5).map((row:any, i:number) => (
                    <div key={i} className="flex justify-between text-sm border-b py-2">
                      <span>{row?.name || row?.user || `User ${i+1}`}</span>
                      <span>{row?.score ?? '-'}</span>
                    </div>
                  ))}
                  {leaderboard.length === 0 && <div className="text-sm text-gray-600">No leaderboard data yet.</div>}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Safety Resources</CardTitle>
                <CardDescription>Download PDFs for offline use</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  <Link to="/resources" className="inline-flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50"><FileText className="w-4 h-4" /> Suraksha Path (EN)</Link>
                  <Link to="/resources" className="inline-flex items-center gap-2 px-3 py-2 border rounded-md hover:bg-gray-50"><FileText className="w-4 h-4" /> Suraksha Path (HI)</Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
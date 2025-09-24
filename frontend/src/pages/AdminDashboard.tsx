import { motion } from 'framer-motion';
import { Users, Target, Bell, BarChart3, Plus, Send } from 'lucide-react';
import { useAuth } from '@/state/auth';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { LineChart } from '@/components/dashboard/LineChart';
import { useTranslation } from '@/state/i18n';

const chartData = [
  { month: 'Jan', students: 2000, drills: 150 },
  { month: 'Feb', students: 3000, drills: 220 },
  { month: 'Mar', students: 4500, drills: 340 },
  { month: 'Apr', students: 6000, drills: 460 },
  { month: 'May', students: 8000, drills: 580 },
  { month: 'Jun', students: 10000, drills: 750 }
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const t = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold font-poppins mb-2">{t['admin_dashboard'] || 'Admin Dashboard'}</h1>
              <p className="text-gray-600">{t['admin_welcome'] || 'Welcome back,'} {user?.name || t['admin_administrator'] || 'Administrator'}</p>
            </div>
            <div className="flex gap-3 items-center">
              <Button onClick={logout} variant="outline" className="font-poppins">Logout</Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {t['admin_new_drill'] || 'New Drill'}
              </Button>
              <Button variant="outline">
                <Send className="mr-2 h-4 w-4" />
                {t['admin_send_alert'] || 'Send Alert'}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title={t['admin_total_students'] || 'Total Students'}
              value="10,245"
              icon={<Users className="w-6 h-6 text-primary" />}
              trend={{ value: 12, direction: 'up', label: t['admin_vs_last_month'] || 'vs last month' }}
            />
            <StatsCard
              title={t['admin_drills_conducted'] || 'Drills Conducted'}
              value="1,583"
              icon={<Target className="w-6 h-6 text-primary" />}
              trend={{ value: 8, direction: 'up', label: t['admin_vs_last_month'] || 'vs last month' }}
            />
            <StatsCard
              title={t['admin_alerts_sent'] || 'Alerts Sent'}
              value="324"
              icon={<Bell className="w-6 h-6 text-primary" />}
              trend={{ value: 5, direction: 'up', label: t['admin_vs_last_month'] || 'vs last month' }}
            />
            <StatsCard
              title={t['admin_avg_safety_score'] || 'Avg. Safety Score'}
              value="86%"
              icon={<BarChart3 className="w-6 h-6 text-primary" />}
              trend={{ value: 3, direction: 'up', label: t['admin_vs_last_month'] || 'vs last month' }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t['admin_platform_growth'] || 'Platform Growth'}</CardTitle>
                <CardDescription>{t['admin_platform_desc'] || 'Students trained and drills conducted'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <LineChart
                    data={chartData}
                    lines={[
                      { key: 'students', name: t['admin_students_trained'] || 'Students Trained', color: '#2563EB' },
                      { key: 'drills', name: t['admin_drills_completed'] || 'Drills Completed', color: '#10B981' }
                    ]}
                    xAxisKey="month"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t['admin_recent_activity'] || 'Recent Activity'}</CardTitle>
                <CardDescription>{t['admin_latest_updates'] || 'Latest platform updates'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium">{t['admin_new_drill_created'] || 'New drill created'}</p>
                      <p className="text-xs text-gray-500">{t['admin_new_drill_desc'] || 'Fire Safety Drill for Region'} {user?.region || 'MH'}</p>
                      <p className="text-xs text-gray-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="text-sm font-medium">{t['admin_alert_sent'] || 'Alert sent'}</p>
                      <p className="text-xs text-gray-500">{t['admin_alert_desc'] || 'Weather advisory for heavy rainfall'}</p>
                      <p className="text-xs text-gray-400">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-purple-500"></div>
                    <div>
                      <p className="text-sm font-medium">{t['admin_new_school'] || 'New school onboarded'}</p>
                      <p className="text-xs text-gray-500">St. Xavier's High School, Mumbai</p>
                      <p className="text-xs text-gray-400">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500"></div>
                    <div>
                      <p className="text-sm font-medium">{t['admin_quiz_updated'] || 'Quiz updated'}</p>
                      <p className="text-xs text-gray-500">{t['admin_quiz_desc'] || 'Earthquake Safety Quiz - Added 3 new questions'}</p>
                      <p className="text-xs text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t['admin_regional_scores'] || 'Regional Safety Scores'}</CardTitle>
              <CardDescription>{t['admin_regional_desc'] || 'Preparedness levels across different regions'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">{t['admin_region'] || 'Region'}</th>
                      <th className="text-left py-3 px-4">{t['admin_schools'] || 'Schools'}</th>
                      <th className="text-left py-3 px-4">{t['admin_students'] || 'Students'}</th>
                      <th className="text-left py-3 px-4">{t['admin_drills'] || 'Drills'}</th>
                      <th className="text-left py-3 px-4">{t['admin_safety_score'] || 'Safety Score'}</th>
                      <th className="text-left py-3 px-4">{t['admin_trend'] || 'Trend'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Maharashtra (MH)</td>
                      <td className="py-3 px-4">128</td>
                      <td className="py-3 px-4">4,235</td>
                      <td className="py-3 px-4">512</td>
                      <td className="py-3 px-4">92%</td>
                      <td className="py-3 px-4 text-green-500">↑ 5%</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Delhi (DL)</td>
                      <td className="py-3 px-4">86</td>
                      <td className="py-3 px-4">3,128</td>
                      <td className="py-3 px-4">384</td>
                      <td className="py-3 px-4">88%</td>
                      <td className="py-3 px-4 text-green-500">↑ 3%</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Karnataka (KA)</td>
                      <td className="py-3 px-4">92</td>
                      <td className="py-3 px-4">2,845</td>
                      <td className="py-3 px-4">356</td>
                      <td className="py-3 px-4">85%</td>
                      <td className="py-3 px-4 text-green-500">↑ 7%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">Tamil Nadu (TN)</td>
                      <td className="py-3 px-4">74</td>
                      <td className="py-3 px-4">2,037</td>
                      <td className="py-3 px-4">331</td>
                      <td className="py-3 px-4">82%</td>
                      <td className="py-3 px-4 text-green-500">↑ 4%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </div>
  );
}
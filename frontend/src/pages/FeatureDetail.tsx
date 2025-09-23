import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, Target, Bell, Phone, BarChart3, Bot, ArrowLeft } from 'lucide-react';

type Section = { heading: string; points: string[] };
type Feature = {
  icon: React.ElementType;
  title: string;
  intro: string;
  sections: Section[];
  refs: string[];
};

const featureContent: Record<string, Feature> = {
  quizzes: {
    icon: BookOpen,
    title: 'Preparedness Quizzes & Leaderboard',
    intro: 'Outcome‑based assessments aligned to NDMA School Safety Policy 2016 and CBSE/UGC advisories. Gamified leaderboards foster participation across Indian schools and colleges.',
    sections: [
      {
        heading: 'What you get',
        points: [
          'Question bank covering earthquakes, floods, cyclones, fires, heatwaves, lightning and first‑aid basics in the Indian context',
          'Bilingual UI (English/Hindi) with extendable locale support for state languages',
          'Leaderboard by class, school, district or state; tie‑breakers by time/attempts',
          'Low‑bandwidth mode and mobile‑first design for affordable devices',
        ],
      },
      {
        heading: 'How it works',
        points: [
          'Students take quizzes mapped to drill calendars; results generate preparedness score',
          'Teachers view weak topics and assign revision material',
          'Auto‑calculated risk literacy indicators for district officials',
          'CSV exports for submission to SDMA/NDMA when required',
        ],
      },
    ],
    refs: [
      'NDMA: School Safety Policy 2016',
      'NDRF & State DMAs: Hazard‑wise SOPs',
    ],
  },
  drills: {
    icon: Target,
    title: 'Virtual & On‑Campus Drills',
    intro: 'Structured, step‑by‑step drill flows designed around Indian school infrastructure and state disaster management advisories. Attendance and completion are recorded for audits.',
    sections: [
      { heading: 'Drill coverage', points: ['Earthquake (Drop‑Cover‑Hold)', 'Fire evacuation routes and assembly points', 'Flood/cyclone preparedness for coastal and riverine districts', 'First‑aid and safe shutdown checklists'] },
      { heading: 'Operational details', points: ['QR‑based or manual attendance capture', 'Evidence logs with timestamps for inspections', 'Hindi/English instructions; pictorial steps for younger grades', 'Printable drill sheets for offline execution'] },
    ],
    refs: ['SDMA circulars; District Disaster Management Plans (DDMPs)'],
  },
  alerts: {
    icon: Bell,
    title: 'Region‑Based Alerts',
    intro: 'Trustworthy, admin‑approved advisories targeting Indian states/districts/PIN‑code clusters. Built for quick dissemination in both English and Hindi.',
    sections: [
      { heading: 'Targeting', points: ['Send to school, district, or custom region codes', 'Optional bilingual fields to increase reach', 'Front‑end Server‑Sent Events (SSE) for near real‑time delivery'] },
      { heading: 'Governance', points: ['Role‑based permissions for message approval', 'Delivery logs and simple analytics'] },
    ],
    refs: ['Government of India emergency number 112; state control rooms'],
  },
  contacts: {
    icon: Phone,
    title: 'Emergency Contacts',
    intro: 'A verified directory of national helplines and local control rooms maintained by administrators for quick access during incidents.',
    sections: [
      { heading: 'Directory', points: ['112 (ERSS), 101 (Fire), 102 (Ambulance)', 'District control rooms and weather helplines', 'Campus security, hospital and police stations nearby'] },
      { heading: 'Usage', points: ['Click‑to‑call on mobile', 'Export & print for offline boards and diaries'] },
    ],
    refs: ['MoHFW, MHA, NDMA published helplines'],
  },
  analytics: {
    icon: BarChart3,
    title: 'Preparedness Analytics',
    intro: 'Decision dashboards for principals, management and district officials showing drill participation, quiz mastery and preparedness scores.',
    sections: [
      { heading: 'KPIs', points: ['Preparedness score (weighted quizzes + drills)', 'Drill compliance and repeat‑gap', 'Topic mastery (Indian hazards) by grade/section', 'Regional comparisons with privacy safeguards'] },
      { heading: 'Exports', points: ['CSV/PDF exports for audits and reviews', 'District‑level snapshots for DDMPs'] },
    ],
    refs: ['DDMP reporting formats; school audit checklists'],
  },
  chatbot: {
    icon: Bot,
    title: 'Safety Chatbot (Admin Assistant)',
    intro: 'Local DistilBERT QA pipeline operating on retrieved Indian safety sources (works offline after initial caching). Helps quickly recall procedures during planning and drills.',
    sections: [
      { heading: 'Capabilities', points: ['Answers based on retrieved context; avoids unsafe hallucinations', 'English/Hindi queries; extendable to other Indian languages', 'Admin‑side assistant for SOP recall and drill planning'] },
      { heading: 'Infra', points: ['Hugging Face DistilBERT (SQuAD) reader', 'Wikipedia/official docs retrieval; offline cache in container', 'Configurable compliance logging'] },
    ],
    refs: ['NDMA guidelines; BIS building codes (as applicable)'],
  },
};

export default function FeatureDetail() {
  const { slug } = useParams<{ slug: string }>();
  const fc = featureContent[slug || ''] || featureContent['quizzes'];
  const Icon = fc.icon;
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 py-10 border-b">
        <Container>
          <div className="flex items-center gap-3 mb-3 text-sm text-blue-700">
            <ArrowLeft className="w-4 h-4" />
            <Link to="/features" className="hover:underline">Back to Features</Link>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="primary" className="px-3 py-1">SurakshaPath</Badge>
            <Icon className="w-6 h-6 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-extrabold font-poppins text-gray-900"><span className="text-blue-700">{fc.title.split(' ')[0]}</span> {fc.title.split(' ').slice(1).join(' ')}</h1>
          </div>
          <p className="text-lg text-gray-700 max-w-4xl"><span className="text-blue-700 font-medium">Why it matters for India:</span> {fc.intro}</p>
        </Container>
      </div>

      <Container>
        <div className="py-10 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {fc.sections.map((sec, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-blue-700">{sec.heading}</CardTitle>
                  <CardDescription>
                    {i === 0 ? 'Key capabilities tailored for Indian institutions' : 'Implementation details'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc ml-6 space-y-2 text-gray-700">
                    {sec.points.map((p, j) => (
                      <li key={j} className="transition-transform hover:translate-x-1">
                        <span className="text-blue-700">•</span> <span className="ml-2">{p}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700">Standards & India References</CardTitle>
                <CardDescription>Guidance we align with</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  {fc.refs.map((r, i) => (<li key={i}>{r}</li>))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>Try the feature now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <p>Login as Admin to configure and test this feature.</p>
                  <div className="flex gap-3">
                    <Link to="/register" className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Create Account</Link>
                    <Link to="/login" className="px-3 py-2 border rounded-md text-blue-700 border-blue-200 hover:bg-blue-50">Login</Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-blue-700">
                  <li><Link to="/features/quizzes" className="hover:underline">Quizzes & Leaderboard</Link></li>
                  <li><Link to="/features/drills" className="hover:underline">Drills</Link></li>
                  <li><Link to="/features/alerts" className="hover:underline">Alerts</Link></li>
                  <li><Link to="/features/contacts" className="hover:underline">Emergency Contacts</Link></li>
                  <li><Link to="/features/analytics" className="hover:underline">Analytics</Link></li>
                  <li><Link to="/features/chatbot" className="hover:underline">Safety Chatbot</Link></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}



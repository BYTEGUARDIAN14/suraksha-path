import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { useTranslation } from '@/state/i18n';

const resources = [
  {
    title: 'Suraksha Path PDF (English)',
    description: 'Comprehensive safety guide in English',
    filename: 'suraksha_path_en.pdf',
  },
  {
    title: 'Suraksha Path PDF (Hindi)',
    description: 'समग्र सुरक्षा गाइड (हिन्दी)',
    filename: 'suraksha_path_hi.pdf',
  },
];

export default function Resources() {
  const t = useTranslation();
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 font-poppins mb-4">
            {t['resources'] || 'Safety Resources'}
          </h1>
          <p className="text-xl text-gray-600">
            {t['resources_desc'] || 'Download and keep these important safety guides for offline access'}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {resources.map((resource) => (
            <Card key={resource.filename} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => window.open(`/resources/${resource.filename}`)}>
                  <Download className="w-4 h-4 mr-2" />
                  {t['resources_download'] || 'Download PDF'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            {t['resources_offline'] || 'These resources are available offline once downloaded. Keep them handy for emergency situations.'}
          </p>
        </div>
      </div>
    </div>
  );
}
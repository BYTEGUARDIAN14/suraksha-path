import Chatbot from '@/components/Chatbot';

export default function Assistant() {
  return (
    <div className="min-h-[50vh]">
      <h1 className="text-xl font-semibold mb-4 font-poppins text-blue-700">Safety Chatbox (Admin Assistant)</h1>
      <p className="text-sm text-gray-600 mb-4">Use the floating widget at bottom-right to ask safety questions.</p>
      <Chatbot />
    </div>
  );
}



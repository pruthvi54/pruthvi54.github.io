import { useLocation } from 'wouter';
import Layout from '@/components/Layout';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-slate-300 dark:text-slate-700 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The page you're looking for doesn't exist.
          </p>
          <button
            onClick={() => setLocation('/')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </Layout>
  );
}


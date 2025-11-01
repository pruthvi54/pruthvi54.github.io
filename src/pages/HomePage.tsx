import { useLocation } from 'wouter';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <section className="min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                Welcome to my portfolio
              </div>
              <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Pruthviraj Mane</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                AI researcher and machine learning engineer passionate about building intelligent systems that solve real-world problems.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setLocation('/experience')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Explore My Work <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLocation('/contact')}
                className="px-6 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                Get in Touch
              </button>
            </div>

            <div className="flex gap-6 pt-4">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Research Papers</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">10+</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Projects</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">5+</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Years Experience</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-3xl"></div>
            <div className="relative w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <div className="text-white text-center">
                <div className="text-8xl mb-2">👩‍🔬</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

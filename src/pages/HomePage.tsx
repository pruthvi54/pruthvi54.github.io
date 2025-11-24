import { useLocation } from 'wouter';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

export default function HomePage() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <section className="pt-12 pb-2 min-h-[calc(100vh-21rem)]">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                Welcome to my portfolio
              </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Pruthviraj Mane</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Robotics engineer focused on high-fidelity system modeling, simulation, and autonomy for robotics platforms especially marine vehicles. My work integrates real-time robotics frameworks with physics-accurate simulation environments for development, testing, and validation.
                </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setLocation('/projects')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                Explore My Work <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setLocation('/me');
                  setTimeout(() => {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                  }, 100);
                }}
                className="px-6 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                Get in Touch
              </button>
            </div>

              {/* <div className="flex gap-6 pt-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">2.5+</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Years at IISc</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5+</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Major Projects</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">98.79</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">GATE Percentile</p>
                </div>
              </div> */}
          </div>

          {/* Hero Image */}
          <div className="relative h-96 md:h-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-3xl"></div>
            <div className="relative w-64 h-100 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-500/20">
              <img 
                src="/pruthvi.jpg" 
                alt="Pruthviraj Mane" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

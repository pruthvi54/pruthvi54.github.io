import Layout from '@/components/Layout';
import { Zap } from 'lucide-react';

export default function MePage() {
  return (
    <Layout>
      <section className="py-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-bold">About Me</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Beyond research and code</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">My Journey</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                I started my journey in computer science with a passion for understanding how machines can learn and adapt. Over the years, I've worked on diverse projects ranging from computer vision to natural language processing, always driven by the goal of making AI more accessible and impactful.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                My research focuses on creating efficient and interpretable AI systems that can solve real-world problems. I believe in the power of collaboration and open science, which is why I actively contribute to the research community through publications, open-source projects, and mentoring.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">What Drives Me</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">Solving complex problems with elegant solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-slate-700 dark:text-slate-300">Making AI understandable and trustworthy</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  <span className="text-slate-700 dark:text-slate-300">Collaborating with brilliant minds globally</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">Continuous learning and growth</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-lg mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Location</p>
                  <p className="text-lg font-semibold">San Francisco, CA</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Education</p>
                  <p className="text-lg font-semibold">PhD in Computer Science</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Specialization</p>
                  <p className="text-lg font-semibold">AI & Machine Learning</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Experience</p>
                  <p className="text-lg font-semibold">5+ Years</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-6">Skills & Languages</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Programming</p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'C++', 'JavaScript', 'Rust'].map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {['PyTorch', 'TensorFlow', 'React', 'Node.js'].map((fw) => (
                      <span key={fw} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {['English', 'Mandarin', 'Spanish'].map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-lg mb-4">Beyond Work</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                When I'm not diving into research papers or writing code, you'll find me exploring the intersection of technology and creativity. I'm passionate about photography, love traveling to new places, and enjoy playing music in my spare time.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Coffee enthusiast, open-source contributor, and lifelong learner. Always excited to connect with people who share similar interests!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

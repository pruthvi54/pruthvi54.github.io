import Layout from '@/components/Layout';

export default function ResearchPage() {
  const researchAreas = [
    { icon: '🧠', title: 'Multimodal Learning', desc: 'Combining vision and language for intelligent systems' },
    { icon: '👁️', title: 'Computer Vision', desc: 'Advanced image processing and 3D understanding' },
    { icon: '💬', title: 'Natural Language', desc: 'Multilingual models and cross-lingual transfer' },
    { icon: '⚡', title: 'Optimization', desc: 'Efficient algorithms for real-time inference' },
    { icon: '🤖', title: 'Robotics', desc: 'Autonomous systems and perception' },
    { icon: '📊', title: 'Data Science', desc: 'Large-scale dataset processing and analysis' }
  ];

  return (
    <Layout>
      <section className="py-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-bold">Research Focus</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Areas of expertise and active research</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {researchAreas.map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-bold mb-4">Current Research Interests</h2>
          <ul className="space-y-3 text-slate-700 dark:text-slate-300">
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400">→</span>
              <span>Developing efficient multimodal architectures that can run on edge devices</span>
            </li>
            <li className="flex gap-3">
              <span className="text-purple-600 dark:text-purple-400">→</span>
              <span>Exploring cross-lingual transfer learning for low-resource languages</span>
            </li>
            <li className="flex gap-3">
              <span className="text-pink-600 dark:text-pink-400">→</span>
              <span>Building interpretable AI systems for autonomous robotics</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 dark:text-blue-400">→</span>
              <span>Investigating novel optimization techniques for large-scale models</span>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}

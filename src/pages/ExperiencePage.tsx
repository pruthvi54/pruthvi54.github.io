import Layout from '@/components/Layout';

export default function ExperiencePage() {
  const experiences = [
    {
      title: 'Senior AI Researcher',
      company: 'Stanford University',
      period: 'Jan 2024 - Present',
      description: 'Leading research on multimodal learning systems and developing novel architectures for vision-language models.',
      highlights: ['94% accuracy on benchmarks', '40% faster inference', '3 publications']
    },
    {
      title: 'ML Engineer',
      company: 'MIT CSAIL',
      period: 'Jul 2023 - Dec 2023',
      description: 'Implemented real-time 3D point cloud processing for autonomous systems and robotics applications.',
      highlights: ['Real-time processing', 'Edge deployment', '5+ collaborators']
    },
    {
      title: 'Research Assistant',
      company: 'UC Berkeley',
      period: 'Aug 2022 - Jun 2023',
      description: 'Developed multilingual NLP models for low-resource languages with focus on data efficiency.',
      highlights: ['50+ languages', '100K+ documents', 'Cross-lingual performance']
    },
    {
      title: 'Junior ML Developer',
      company: 'Tech Startup',
      period: 'Jan 2022 - Jul 2022',
      description: 'Built machine learning pipelines for computer vision applications in production environments.',
      highlights: ['Production deployment', 'Model optimization', 'Team collaboration']
    }
  ];

  return (
    <Layout>
      <section className="py-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-bold">Experience</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">My professional journey in AI and machine learning</p>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="group p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-lg hover:shadow-blue-500/10">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{exp.period}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.highlights.map((h, i) => (
                  <span key={i} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

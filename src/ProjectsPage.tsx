import Layout from '@/components/Layout';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Vision-Language Model',
      desc: 'End-to-end framework for training on combined vision and language data',
      tags: ['PyTorch', 'Vision', 'NLP', 'CUDA'],
      status: 'Active',
      details: 'A comprehensive framework that enables efficient training of models on multimodal data. Includes data loading pipelines, model architectures, and evaluation metrics.'
    },
    {
      title: '3D Point Cloud Processor',
      desc: 'Real-time segmentation and analysis for autonomous systems',
      tags: ['3D Vision', 'Real-time', 'Robotics'],
      status: 'Published',
      details: 'Optimized implementation of state-of-the-art point cloud segmentation algorithms with focus on real-time performance for edge deployment.'
    },
    {
      title: 'Multilingual NLP Pipeline',
      desc: 'Automated processing for 50+ languages with cross-lingual capabilities',
      tags: ['NLP', 'Python', 'Data Pipeline'],
      status: 'Active',
      details: 'Complete pipeline for preprocessing, tokenizing, and analyzing text in multiple languages with support for cross-lingual transfer learning.'
    },
    {
      title: 'ML Visualization Tool',
      desc: 'Interactive web-based tool for understanding model behavior',
      tags: ['React', 'D3.js', 'Web'],
      status: 'Published',
      details: 'Interactive visualization platform for exploring model predictions, feature importance, and decision boundaries across different datasets.'
    },
    {
      title: 'Autonomous Navigation System',
      desc: 'Computer vision-based navigation for mobile robots',
      tags: ['ROS', 'OpenCV', 'C++'],
      status: 'Active',
      details: 'Real-time visual SLAM and obstacle detection system for autonomous mobile robots with integration to ROS middleware.'
    },
    {
      title: 'Data Annotation Platform',
      desc: 'Collaborative tool for large-scale dataset annotation',
      tags: ['React', 'Node.js', 'MongoDB'],
      status: 'Published',
      details: 'Web-based platform for team collaboration on dataset annotation with quality control and progress tracking features.'
    }
  ];

  return (
    <Layout>
      <section className="py-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-bold">Projects</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Selected work and implementations</p>
        </div>

        <div className="space-y-6">
          {projects.map((proj, idx) => (
            <div key={idx} className="p-6 rounded-xl border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-900 hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{proj.title}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  proj.status === 'Active' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' 
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                }`}>
                  {proj.status}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-2">{proj.desc}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{proj.details}</p>
              <div className="flex flex-wrap gap-2">
                {proj.tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                    {tag}
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

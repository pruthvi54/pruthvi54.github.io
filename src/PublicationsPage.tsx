import Layout from '@/components/Layout';

export default function PublicationsPage() {
  const publications = [
    {
      title: 'Efficient Multimodal Learning with Cross-Modal Attention',
      authors: 'Chen, S., Smith, J., & Johnson, K.',
      venue: 'International Conference on Machine Learning (ICML)',
      year: 2024,
      abstract: 'This paper presents a novel approach to multimodal learning that reduces computational complexity while maintaining state-of-the-art performance on benchmark datasets. We introduce a cross-modal attention mechanism that efficiently combines information from multiple modalities.',
      links: { pdf: '#', arxiv: '#', code: '#' }
    },
    {
      title: 'Real-Time 3D Object Detection in Point Clouds',
      authors: 'Chen, S., Lee, M., & Wang, X.',
      venue: 'IEEE/CVF Computer Vision and Pattern Recognition (CVPR)',
      year: 2023,
      abstract: 'A novel architecture for real-time 3D object detection optimized for autonomous vehicles and robotics applications. Our method achieves state-of-the-art accuracy while maintaining real-time inference speeds on edge devices.',
      links: { pdf: '#', arxiv: '#', code: '#' }
    },
    {
      title: 'Building Multilingual Language Models for Low-Resource Languages',
      authors: 'Chen, S., Patel, R., & Kumar, A.',
      venue: 'Association for Computational Linguistics (ACL)',
      year: 2023,
      abstract: 'Techniques for efficiently training multilingual models with limited data, achieving competitive performance across 50+ languages. We propose novel data augmentation and transfer learning strategies specifically designed for low-resource scenarios.',
      links: { pdf: '#', arxiv: '#', code: '#' }
    },
    {
      title: 'Interpretable AI for Autonomous Systems',
      authors: 'Chen, S., Brown, D., & Garcia, M.',
      venue: 'IEEE Transactions on Robotics',
      year: 2023,
      abstract: 'Methods for building interpretable machine learning models for autonomous systems. We demonstrate how to balance model complexity with interpretability while maintaining high performance.',
      links: { pdf: '#', arxiv: '#', code: '#' }
    },
    {
      title: 'Efficient Fine-tuning of Large Language Models',
      authors: 'Chen, S., Wilson, K., & Taylor, J.',
      venue: 'Neural Information Processing Systems (NeurIPS)',
      year: 2022,
      abstract: 'Novel techniques for efficient fine-tuning of large language models with reduced memory requirements. Our approach enables fine-tuning on consumer-grade hardware while maintaining competitive performance.',
      links: { pdf: '#', arxiv: '#', code: '#' }
    },
    {
      title: 'Cross-Lingual Transfer Learning for NLP Tasks',
      authors: 'Chen, S., Kumar, A., & Patel, R.',
      venue: 'Findings of the Association for Computational Linguistics (ACL)',
      year: 2022,
      abstract: 'Investigating cross-lingual transfer learning mechanisms for low-resource NLP tasks. We propose novel training strategies that improve performance on target languages with minimal labeled data.',
      links: { pdf: '#', arxiv: '#', code: '#' }
    }
  ];

  return (
    <Layout>
      <section className="py-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-bold">Publications</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Academic contributions and research papers</p>
        </div>

        <div className="space-y-6">
          {publications.map((pub, idx) => (
            <div key={idx} className="p-6 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{pub.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{pub.authors}</p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">{pub.venue} ({pub.year})</p>
              <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">{pub.abstract}</p>
              <div className="flex flex-wrap gap-3">
                <a href={pub.links.pdf} className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  [PDF]
                </a>
                <a href={pub.links.arxiv} className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  [arXiv]
                </a>
                <a href={pub.links.code} className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                  [Code]
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

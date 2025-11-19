import Layout from '@/components/Layout';

export default function PublicationsPage() {
  const publications = [
    {
      title: 'AquaNav-Unmanned Surface Vehicle Simulator Using Unreal Engine 5',
      authors: 'Mane, Pruthviraj and George, Allen and Khonde, Aditya and Sundaram, Suresh',
      venue: 'OCEANS 2025 Brest',
      year: 2025,
      abstract: 'A high-fidelity Unmanned Surface Vehicle (USV) simulator built using Unreal Engine 5 for testing and validation of autonomous navigation algorithms in realistic maritime environments. The simulator provides photorealistic rendering, dynamic environmental control, and ROS integration for seamless sim-to-real transfer.',
      links: { 
        paper: 'https://ieeexplore.ieee.org/abstract/document/11104589',
        github: 'https://github.com/AIRLabIISc/AquaNav'
      }
    },
    {
      title: 'EROAS: 3D Efficient Reactive Obstacle Avoidance System for Autonomous Underwater Vehicles using 2.5 D Forward-Looking Sonar',
      authors: 'Mane, Pruthviraj and George, Allen Jacob and Makam, Rajini and Majumder, Rudrashis and Sundaram, Suresh',
      venue: 'arXiv preprint',
      year: 2024,
      abstract: 'Autonomous Underwater Vehicles (AUVs) have advanced significantly in obstacle detection and path planning. This paper proposes EROAS, a lightweight framework that augments a standard 2D FLS with a pivoting mechanism, effectively transforming it into a cost-efficient 2.5D sonar. The system integrates SPD2C for rapid gap detection, SCG for maintaining short-term obstacle memory, and ST-CBF for enforcing safety constraints.',
      links: { 
        paper: 'https://arxiv.org/abs/2411.05516',
        github: 'https://github.com/AIRLabIISc/EROAS'
      }
    },
    {
      title: 'Safe navigation of autonomous underwater vehicles using physics-informed neural networks',
      authors: 'Majumder, Rudrashis and Makam, Rajini and Mane, Pruthviraj and KS, Bharathwaj and Sundaram, Suresh',
      venue: 'OCEANS 2024-Singapore',
      year: 2024,
      abstract: 'This paper presents a novel approach to safe navigation of autonomous underwater vehicles using physics-informed neural networks (PINNs). The method combines data-driven learning with physical constraints to ensure safe and robust navigation in complex underwater environments.',
      links: { 
        paper: 'https://ieeexplore.ieee.org/document/10682406',
        github: 'https://github.com/AIRLabIISc/Vertical_PINN'
      }
    },
    {
      title: 'A comprehensive study on modelling and control of autonomous underwater vehicle',
      authors: 'Makam, Rajini and Mane, Pruthviraj and Sundaram, Suresh and Sujit, PB',
      venue: 'arXiv preprint (Book Chapter - Assistive Robotics, CRC Press)',
      year: 2023,
      abstract: 'This comprehensive study presents modeling and robust control of autonomous underwater vehicles in the presence of uncertainties. The vehicle uses a 6-DOF approach considering ocean currents. The study compares conventional and sliding-mode control (SMC) methodologies, showcasing robustness against disturbances and parameter fluctuations.',
      links: { 
        paper: 'https://arxiv.org/abs/2312.02690'
      }
    }
  ];

  return (
    <Layout>
      <section className="pt-4 pb-2">
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
                {pub.links.paper && (
                  <a href={pub.links.paper} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    [Paper]
                  </a>
                )}
                {pub.links.github && (
                  <a href={pub.links.github} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
                    [GitHub]
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

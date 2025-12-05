import { useLocation } from 'wouter';
import { ArrowRight, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import Layout from '@/components/Layout';

export default function ProjectsPage() {
  const [, setLocation] = useLocation();

  // Save and restore scroll position
  useEffect(() => {
    // Restore scroll position when returning to this page
    const savedScrollPosition = sessionStorage.getItem('projectsPageScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
    }

    // Save scroll position when leaving this page
    return () => {
      sessionStorage.setItem('projectsPageScrollPosition', window.scrollY.toString());
    };
  }, []);

  // Projects organized by year
  const projectsByYear = {
    2025: [
      {
        title: 'AquaNav Surface Vehicle Simulator',
        desc: 'Advanced surface vehicle simulation framework for maritime robotics',
        tags: ['Simulation', 'Maritime', 'Unreal Engine'],
        status: 'Ongoing',
        details: 'Development of a comprehensive surface vehicle simulator for testing and validation of autonomous navigation algorithms in realistic maritime environments.',
        detailsLink: '/projects/aquanav-surface-simulator',
        image: '/projects/aquanav-surface-simulator/images/dock.png'
      },
      {
        title: 'ASV Manufacturing',
        desc: 'Design and manufacturing of Autonomous Surface Vehicle',
        tags: ['Hardware', 'Manufacturing', 'ASV', 'Design'],
        status: 'Ongoing',
        details: 'Complete design, prototyping, and manufacturing of an Autonomous Surface Vehicle for marine research and operations.',
        detailsLink: '/projects/asv-manufacturing'
      },
      {
        title: 'EROAS',
        desc: 'Efficient Robot Operating Area System (See arXiv paper)',
        tags: ['Robotics', 'Path Planning', 'Research'],
        status: 'Ongoing',
        details: 'Novel approach for efficient robot operating area optimization. Details available in published arXiv paper.',
        detailsLink: '/projects/eroas',
        image: '/projects/eroas/images/coral_rexrov.png'
      }
    ],
    2024: [
      {
        title: 'AUV Path Planning with ROS Gazebo',
        desc: 'ROS2-based path planning framework for autonomous underwater vehicles',
        tags: ['ROS2', 'Gazebo', 'Path Planning', 'AUV'],
        status: 'Completed',
        details: 'Implemented and tested various path planning algorithms for AUVs in ROS2 environment with Gazebo simulation.',
        detailsLink: '/projects/auv-path-planning-ros'
      },
      {
        title: 'MPC-CBF Framework for AUV Obstacle Avoidance',
        desc: 'Model Predictive Control with Control Barrier Functions for safe navigation',
        tags: ['MPC', 'CBF', 'Safety', 'Control Theory'],
        status: 'Completed',
        details: 'Developed a hybrid MPC-CBF control framework ensuring safe obstacle avoidance while maintaining optimal trajectory for underwater vehicles.',
        detailsLink: '/projects/mpc-cbf-auv'
      },
      {
        title: 'PINN for Underwater Obstacle Avoidance',
        desc: 'Physics-Informed Neural Networks for real-time obstacle detection and avoidance',
        tags: ['Deep Learning', 'PINN', 'Obstacle Avoidance', 'AI'],
        status: 'Completed',
        details: 'Novel application of Physics-Informed Neural Networks for learning-based obstacle avoidance in underwater environments.',
        detailsLink: '/projects/pinn-obstacle-avoidance'
      },
      {
        title: 'AUV Gazebo-Unreal Engine Integration',
        desc: 'Co-registered dataset generation using Gazebo and Unreal Engine',
        tags: ['Gazebo', 'Unreal Engine 5', 'Simulation', 'Dataset'],
        status: 'Completed',
        details: 'Integrated Gazebo physics simulation with Unreal Engine 5 photorealistic rendering for generating high-quality co-registered datasets.',
        detailsLink: '/projects/auv-gazebo-unreal',
        image: '/projects/auv-gazebo-unreal/images/900.png'
      },
      {
        title: 'Underwater Synthetic Dataset Generation',
        desc: 'Large-scale synthetic dataset for perception model training',
        tags: ['Dataset', 'Computer Vision', 'Image Enhancement', 'Depth Estimation'],
        status: 'Completed',
        details: 'Generated comprehensive synthetic underwater dataset for training perception models including image enhancement, depth estimation, and object detection.',
        detailsLink: '/projects/underwater-synthetic-dataset'
      }
    ],
    2023: [
      {
        title: 'VODSONAR: Visual-On-Demand-Sonar Navigation',
        desc: 'Hybrid visual-sonar navigation system for underwater robots',
        tags: ['Sonar', 'Computer Vision', 'Sensor Fusion', 'Navigation'],
        status: 'Published',
        details: 'Developed an intelligent navigation system that dynamically switches between visual and sonar sensing based on water conditions and mission requirements.',
        detailsLink: '/projects/vodsonar'
      },
      {
        title: 'AUV Dynamics Modeling',
        desc: 'Complete 6-DoF dynamics modeling in MATLAB/Simulink',
        tags: ['MATLAB', 'Simulink', 'Dynamics', 'Modeling'],
        status: 'Completed',
        details: 'Comprehensive mathematical modeling of AUV dynamics including hydrodynamic coefficients, added mass, and environmental disturbances using MATLAB/Simulink.',
        detailsLink: '/projects/auv-dynamics-modeling'
      }
    ],
    2022: [
      {
        title: 'EV Torque Vectoring Control',
        desc: 'Lateral stability improvement through differential torque control',
        tags: ['Control Theory', 'LQR', 'MPC', 'SMC', 'EV Dynamics'],
        status: 'Completed',
        details: 'Analyzed and compared LQR, MPC, and SMC controllers for differential torque vectoring to improve lateral stability of four-wheel electric vehicles.',
        detailsLink: '/projects/ev-torque-vectoring',
        image: '/projects/ev-torque-vectoring/images/Torque_Vectoring.png'
      }
    ],
    2021: [
      {
        title: 'Adaptive Cruise Control for Electric Vehicles',
        desc: 'ADAS system with PI control for target speed and safe headway maintenance',
        tags: ['MATLAB', 'Simulink', 'Control Systems', 'EV', 'ADAS'],
        status: 'Completed',
        details: 'Modeled Adaptive Cruise Control in MATLAB/Simulink with PI control algorithms to maintain target speed while ensuring safe headway distance.',
        detailsLink: '/projects/adaptive-cruise-control'
      },
      {
        title: 'EV Drive Cycle Analysis',
        desc: 'Analysis of ICE two-wheeler drive cycle for EV parameter optimization',
        tags: ['Drive Cycle', 'EV', 'Data Analysis', 'Optimization'],
        status: 'Completed',
        details: 'Comprehensive analysis of internal combustion engine two-wheeler drive cycles to derive optimal parameters for electric vehicle design.',
        detailsLink: '/projects/ev-drive-cycle-analysis'
      }
    ],
    2020: [
      {
        title: 'COVID Mask for Sports People',
        desc: 'Specialized protective mask design for athletic activities',
        tags: ['Product Design', 'Healthcare', 'Ergonomics', 'COVID-19'],
        status: 'Completed',
        details: 'Designed and prototyped specialized COVID-19 protective masks optimized for comfort and breathability during sports and athletic activities.',
        detailsLink: '/projects/covid-mask-sports'
      }
    ],
    2019: [
      {
        title: 'Self-Coordinating Manual and Automatic Robots',
        desc: 'Collaborative system enabling seamless manual-automatic robot coordination',
        tags: ['Robotics', 'Automation', 'Coordination', 'Robocon'],
        status: 'Completed',
        details: 'Developed a coordination system allowing manual and automatic robots to work together seamlessly for complex task execution.',
        detailsLink: '/projects/self-coordinating-robots'
      },
      {
        title: 'Autonomous Agricultural Plant Caretaker',
        desc: 'Small-scale prototype for automated sowing, sensing, and watering',
        tags: ['SolidWorks', 'Automation', 'Agriculture', 'Robocon'],
        status: 'Published',
        details: 'Designed and prototyped an autonomous system for sowing, moisture sensing, and watering with rail-based UTM mechanism. Team project for ABU Robocon 2018 (AIR 38/107).',
        detailsLink: '/projects/agricultural-plant-caretaker'
      }
    ]
  };

  return (
    <Layout>
      <section className="pt-4 pb-2">
        <div className="space-y-4 mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">Projects</h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">
            (Website is under construction and content is being uploaded.)
          </p>
        </div>

        {/* Year-wise project listing */}
        <div className="space-y-12">
          {Object.entries(projectsByYear)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Sort descending
            .map(([year, projects]) => (
              <div key={year}>
                {/* Year Header */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-bold text-[#4A70A9] dark:text-[#8FABD4]">{year}</h2>
                  <div className="flex-1 h-0.5 bg-[#8FABD4]/50 dark:bg-[#8FABD4]/30 mt-4"></div>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((proj, idx) => (
                    <div 
                      key={idx} 
                      className="rounded-xl border-2 border-[#8FABD4]/30 dark:border-[#8FABD4]/20 bg-white dark:bg-slate-800 hover:shadow-xl hover:border-[#4A70A9] transition-all overflow-hidden group flex flex-col"
                    >
                      {/* Preview Image */}
                      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-[#8FABD4] to-[#4A70A9]">
                        {proj.image ? (
                          <img 
                            src={proj.image} 
                            alt={`${proj.title} preview`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-white/30 text-6xl group-hover:text-white/40 transition-colors">📷</div>
                            </div>
                            {/* Subtle overlay pattern */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                          </>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-xl font-bold mb-3 text-[#000000] dark:text-white">
                          {proj.title}
                        </h3>
                        
                        <p className="text-sm text-[#000000]/70 dark:text-slate-300 mb-3 line-clamp-4 leading-relaxed">
                          {proj.details}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {proj.tags.slice(0, 5).map((tag, i) => (
                            <span 
                              key={i} 
                              className="text-xs bg-[#4A70A9] dark:bg-[#3A5A89] text-slate-200 px-3 py-1.5 rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {proj.tags.length > 5 && (
                            <span className="text-xs text-slate-200 px-2 py-1 font-medium">
                              +{proj.tags.length - 5}
                            </span>
                          )}
                        </div>
                        
                        {proj.detailsLink && (
                          <button
                            onClick={() => setLocation(proj.detailsLink)}
                            className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-[#4A70A9] dark:text-[#8FABD4] rounded-lg font-medium transition-all shadow-md hover:shadow-lg group border-2 border-[#4A70A9] dark:border-[#8FABD4] outline-none focus:outline-none focus:ring-0 active:outline-none"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  );
}

import Layout from '@/components/Layout';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Adaptive Cruise Control for Electric Vehicles',
      desc: 'ADAS system with PI control for target speed and safe headway maintenance',
      tags: ['MATLAB', 'Simulink', 'Control Systems', 'EV'],
      status: 'Active',
      details: 'Modeled ACC in MATLAB/Simulink with PI control algorithms to maintain target speed while ensuring safe headway distance. Ongoing project with focus on ADAS applications for electric vehicles.'
    },
    {
      title: 'AUV Dynamics & Simulation Framework',
      desc: '6-DoF underactuated AUV modeling and ROS-based simulation environment',
      tags: ['MATLAB', 'Simulink', 'ROS2', 'Gazebo', 'Unreal Engine 5'],
      status: 'Active',
      details: 'Complete AUV simulation framework with 6-DoF dynamics modeling, ROS2/Gazebo integration for visualization, and Unreal Engine 5 for photorealistic underwater datasets. Includes IMU, camera, DVL, and sonar sensor integration.'
    },
    {
      title: 'Sonar-based Reactive Obstacle Avoidance',
      desc: '2.5D forward-looking sonar system balancing safety and efficiency',
      tags: ['Computer Vision', '3D Processing', 'Real-time', 'Safety'],
      status: 'Published',
      details: 'Developed a reactive obstacle avoidance system for AUVs using forward-looking sonar data, balancing safety constraints with navigation efficiency in 3D underwater environments.'
    },
    {
      title: 'EV Torque Vectoring Control',
      desc: 'Lateral stability improvement through differential torque control',
      tags: ['Control Theory', 'LQR', 'MPC', 'SMC', 'EV Dynamics'],
      status: 'Published',
      details: 'Analyzed and compared LQR, MPC, and SMC controllers for differential torque vectoring to improve lateral stability of electric vehicles. Part of MS thesis research on EV dynamics and control.'
    },
    {
      title: 'Dynamic Ship Simulator',
      desc: 'Unreal Engine 5 based maritime simulator for synthetic data generation',
      tags: ['Unreal Engine 5', 'Maritime Simulation', 'Synthetic Data'],
      status: 'Active',
      details: 'Built a dynamic ship simulator in Unreal Engine 5 for maritime scenarios, enabling synthetic data generation for marine robotics research and validation of navigation algorithms.'
    },
    {
      title: 'Autonomous Agricultural Plant Caretaker',
      desc: 'Small-scale prototype for automated sowing, sensing, and watering',
      tags: ['SolidWorks', 'Automation', 'Agriculture', 'Robocon'],
      status: 'Published',
      details: 'Designed and prototyped an autonomous system for sowing, moisture sensing, and watering with rail-based UTM mechanism and onboard seed holder. Team project for ABU Robocon 2018 (AIR 38/107).'
    }
  ];

  return (
    <Layout>
      <section className="py-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-bold">Projects</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Robotics, simulation, and control systems projects</p>
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

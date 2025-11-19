import Layout from '@/components/Layout';

export default function ExperiencePage() {
  const experiences = [
    {
      title: 'Project Associate',
      company: 'AIRL (Artificial Intelligence & Robotics Lab), IISc Bangalore',
      period: 'Aug 2022 - Present',
      description: 'Modeling and simulating autonomous underwater vehicles (AUVs) with focus on system modeling, simulation, and intelligent autonomy for marine applications.',
      highlights: ['6-DoF AUV modeling in MATLAB/Simulink', 'ROS/ROS2 + Gazebo simulator', 'Sonar-based obstacle avoidance', 'Unreal Engine 5 integration', 'Physics-informed neural networks with CBF']
    },
    {
      title: 'Graduate Student (MS Research)',
      company: 'IIT Guwahati - Emobility Program',
      period: 'Aug 2020 - Jul 2022',
      description: 'Specialized in electric vehicle dynamics, stability analysis, and advanced control systems for automotive applications.',
      highlights: ['EV torque vectoring research', 'LQR/MPC/SMC controllers', 'CGPA: 7.76', 'Inter IIT Tech Meet participation']
    },
    {
      title: 'Team Captain, Robocon',
      company: 'Walchand College of Engineering',
      period: 'Jan 2018 - May 2019',
      description: 'Led a 30-member interdisciplinary team in ABU Robocon 2018, achieving All India Rank 38 out of 107 participating teams.',
      highlights: ['AIR 38/107 in Robocon 2018', '30-member team leadership', 'Autonomous agricultural robot', 'SolidWorks design and prototyping']
    }
  ];

  return (
    <Layout>
      <section className="pt-4 pb-2">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-bold">Experience</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">My professional journey in robotics, simulation, and autonomous systems</p>
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

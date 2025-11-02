import React from 'react';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function SimpleApp() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Pruthviraj Mane</h1>
          <p className="text-xl text-blue-100">Robotics Engineer — System Modeling & Simulation</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">About</h2>
          <p className="text-lg text-gray-700 mb-4">
            Robotics Engineer focused on system modeling & simulation. I build intelligent systems for marine and EV applications using ROS, MATLAB/Simulink, and Unreal Engine 5.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.5+</div>
              <p className="text-sm text-gray-600">Years at IISc</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5+</div>
              <p className="text-sm text-gray-600">Major Projects</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">98.79</div>
              <p className="text-sm text-gray-600">GATE Percentile</p>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Experience</h2>
          
          <div className="border-l-4 border-blue-500 pl-6 mb-6">
            <h3 className="text-xl font-bold">Project Associate</h3>
            <p className="text-blue-600 font-medium">AIRL (AI & Robotics Lab), IISc Bangalore</p>
            <p className="text-gray-600 text-sm mb-2">Aug 2022 - Present</p>
            <p className="text-gray-700">
              Modeling and simulating autonomous underwater vehicles (AUVs) with focus on system modeling, simulation, and intelligent autonomy for marine applications.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">6-DoF AUV modeling</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">ROS/ROS2 + Gazebo</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Unreal Engine 5</span>
            </div>
          </div>

          <div className="border-l-4 border-purple-500 pl-6 mb-6">
            <h3 className="text-xl font-bold">Graduate Student (MS Research)</h3>
            <p className="text-purple-600 font-medium">IIT Guwahati - Emobility Program</p>
            <p className="text-gray-600 text-sm mb-2">Aug 2020 - Jul 2022</p>
            <p className="text-gray-700">
              Specialized in electric vehicle dynamics, stability analysis, and advanced control systems for automotive applications.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">EV torque vectoring</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">LQR/MPC/SMC</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">CGPA: 7.76</span>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-xl font-bold">Team Captain, Robocon</h3>
            <p className="text-green-600 font-medium">Walchand College of Engineering</p>
            <p className="text-gray-600 text-sm mb-2">Jan 2018 - May 2019</p>
            <p className="text-gray-700">
              Led a 30-member interdisciplinary team in ABU Robocon 2018, achieving All India Rank 38 out of 107 participating teams.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">AIR 38/107</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">30-member team</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">SolidWorks design</span>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Key Projects</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Adaptive Cruise Control for EVs</h3>
              <p className="text-gray-700 mb-3">ADAS system with PI control for target speed and safe headway maintenance</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">MATLAB</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Simulink</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Control Systems</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">AUV Dynamics & Simulation</h3>
              <p className="text-gray-700 mb-3">6-DoF underactuated AUV modeling and ROS-based simulation environment</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">ROS2</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Gazebo</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Unreal Engine 5</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">EV Torque Vectoring Control</h3>
              <p className="text-gray-700 mb-3">Lateral stability improvement through differential torque control</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">LQR</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">MPC</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">SMC</span>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2">Sonar-based Obstacle Avoidance</h3>
              <p className="text-gray-700 mb-3">2.5D forward-looking sonar system balancing safety and efficiency</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded">Computer Vision</span>
                <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded">Real-time</span>
                <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded">Safety</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Skills & Technologies</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-3">Programming</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">C/C++</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">MATLAB</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-3">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">ROS/ROS2</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">PyTorch</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Docker</span>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-3">Tools</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">SolidWorks</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Gazebo</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Unreal Engine 5</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Contact</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href="mailto:pruthviraj3629@gmail.com" 
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-bold">Email</div>
                <div className="text-sm text-gray-600">pruthviraj3629@gmail.com</div>
              </div>
            </a>
            <a 
              href="https://linkedin.com/in/pruthviraj-mane" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Linkedin className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-bold">LinkedIn</div>
                <div className="text-sm text-gray-600">pruthviraj-mane</div>
              </div>
            </a>
            <a 
              href="https://github.com/pruthvi54" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Github className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-bold">GitHub</div>
                <div className="text-sm text-gray-600">github.com/pruthvi54</div>
              </div>
            </a>
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">Education</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold">MS(R), Emobility — IIT Guwahati</h3>
              <p className="text-gray-600">CGPA 7.76 (2022)</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-bold">B.Tech, Mechanical Engineering — Walchand College of Engineering, Sangli</h3>
              <p className="text-gray-600">CGPA 6.85 (2019)</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 text-center text-gray-600">
        <p>© 2024 Pruthviraj Mane. Built with React and Tailwind CSS.</p>
      </footer>
    </div>
  );
}

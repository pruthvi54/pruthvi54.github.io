import { useLocation } from 'wouter';
import { ArrowLeft, Github, ExternalLink, Play } from 'lucide-react';
import Layout from '@/components/Layout';

export default function AuvSimulationProject() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <section className="py-12">
        {/* Back Button */}
        <button
          onClick={() => setLocation('/projects')}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>

        {/* Project Header */}
        <div className="space-y-6 mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold mb-4">AUV Dynamics & Simulation Framework</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                6-DoF underactuated AUV modeling and ROS-based simulation environment
              </p>
            </div>
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
              Active
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {['MATLAB', 'Simulink', 'ROS2', 'Gazebo', 'Unreal Engine 5', 'Python', 'C++'].map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
              <Github className="w-4 h-4" />
              GitHub (Coming Soon)
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <ExternalLink className="w-4 h-4" />
              Documentation
            </button>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-800 mb-12" />

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                This project focuses on developing a comprehensive simulation framework for Autonomous Underwater Vehicles (AUVs). 
                The framework includes complete 6-DoF dynamics modeling, sensor integration, and multiple simulation environments 
                ranging from MATLAB/Simulink for control design to Unreal Engine 5 for photorealistic visualization.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                The system enables rapid prototyping of navigation algorithms, controller validation, and generation of 
                synthetic underwater datasets for machine learning applications.
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <h3 className="font-bold mb-2">6-DoF Dynamics Modeling</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Complete mathematical model including added mass, drag coefficients, and hydrodynamic forces 
                    for realistic underwater vehicle behavior.
                  </p>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <h3 className="font-bold mb-2">Multi-Sensor Integration</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Integrated IMU, camera, DVL (Doppler Velocity Log), and sonar sensors with realistic noise models 
                    and update rates matching commercial hardware.
                  </p>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <h3 className="font-bold mb-2">ROS2 & Gazebo Environment</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Full ROS2 integration with custom message types, tf2 transforms, and Gazebo simulation 
                    for hardware-in-the-loop testing and algorithm validation.
                  </p>
                </div>

                <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <h3 className="font-bold mb-2">Unreal Engine 5 Visualization</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Photorealistic underwater environment with dynamic lighting, water caustics, and marine life 
                    for synthetic dataset generation and demos.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Technical Implementation</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Dynamics Modeling (MATLAB/Simulink)</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
                    <li>Implemented Fossen's equations for underwater vehicle dynamics</li>
                    <li>Added mass matrix and hydrodynamic damping coefficients</li>
                    <li>Thruster allocation matrix for underactuated configuration</li>
                    <li>Current disturbances and environmental effects</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">ROS2 Integration</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
                    <li>Custom message types for AUV state and sensor data</li>
                    <li>TF2 transforms for coordinate frame management</li>
                    <li>Gazebo plugins for realistic sensor simulation</li>
                    <li>RViz visualization for real-time monitoring</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Sensor Suite</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
                    <li><strong>IMU:</strong> 100Hz update rate with gyro/accel noise</li>
                    <li><strong>DVL:</strong> Bottom-lock velocity measurements with 0.1 m/s accuracy</li>
                    <li><strong>Camera:</strong> 30fps stereo camera pair for vision tasks</li>
                    <li><strong>Sonar:</strong> Forward-looking sonar with 30m range</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Media Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Media</h2>
              
              {/* Placeholder for Demo Video */}
              <div className="mb-6">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                    <p className="text-xl font-semibold">Demo Video Coming Soon</p>
                    <p className="text-sm opacity-80 mt-2">AUV simulation in Unreal Engine 5</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                  Video demonstration showing the AUV navigating through an underwater environment
                </p>
              </div>

              {/* Placeholder for Screenshots */}
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Screenshot 1<br/>MATLAB Simulink Model</p>
                </div>
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Screenshot 2<br/>Gazebo Simulation</p>
                </div>
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Screenshot 3<br/>Unreal Engine View</p>
                </div>
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Screenshot 4<br/>RViz Visualization</p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Results & Impact</h2>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Successfully validated dynamics model against real AUV test data with &lt;5% error</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Generated 10,000+ synthetic underwater images for deep learning training</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Reduced hardware testing time by 60% through comprehensive simulation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Framework adopted by 3 other research projects at IISc</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl sticky top-4">
              <h3 className="font-bold text-lg mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Duration:</span>
                  <span className="font-medium text-right">2023 - Present</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Institution:</span>
                  <span className="font-medium text-right">IISc Bangalore</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Role:</span>
                  <span className="font-medium text-right">Research Assistant</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Team Size:</span>
                  <span className="font-medium text-right">3 Members</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Status:</span>
                  <span className="font-medium text-green-600 dark:text-green-400 text-right">Active Development</span>
                </div>
              </div>

              <hr className="border-slate-200 dark:border-slate-800 my-6" />

              {/* Related Publications */}
              <div>
                <h3 className="font-bold text-lg mb-3">Related Work</h3>
                <div className="space-y-2 text-sm">
                  <a href="#" className="block text-blue-600 dark:text-blue-400 hover:underline">
                    Sonar-based Obstacle Avoidance Paper →
                  </a>
                  <a href="#" className="block text-blue-600 dark:text-blue-400 hover:underline">
                    MS Thesis (In Progress) →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button at Bottom */}
        <div className="mt-12">
          <button
            onClick={() => setLocation('/projects')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </button>
        </div>
      </section>
    </Layout>
  );
}


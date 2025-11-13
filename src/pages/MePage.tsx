import Layout from '@/components/Layout';
import { Zap } from 'lucide-react';

export default function MePage() {
  return (
    <Layout>
      <section className="py-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-bold">About Me</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">Beyond research and code</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">My Journey</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                I started my journey in mechanical engineering, but found my passion in robotics and simulation. From leading a 30-member team to AIR 38 in Robocon 2018, to pursuing specialized research in electric vehicles at IIT Guwahati, I've always been driven by building intelligent systems that solve real-world problems.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Currently at IISc AIRL, I focus on modeling and simulating autonomous underwater vehicles, developing everything from 6-DoF dynamics models to sonar-based obstacle avoidance systems. I believe in building end-to-end simulation environments that bridge the gap between theoretical research and practical applications.
              </p>
            </div>
    
            <div>
              <h2 className="text-2xl font-bold mb-4">What Drives Me</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">Building photorealistic simulation environments</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-slate-700 dark:text-slate-300">Bridging theory and practical robotics applications</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  <span className="text-slate-700 dark:text-slate-300">Developing intelligent autonomous systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">Continuous learning and innovation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-lg mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium shrink-0">Location:</span>
                  <span className="text-lg font-semibold text-right">Bengaluru, India</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium shrink-0">Education:</span>
                  <span className="text-lg font-semibold text-right">MS(Research), IIT Guwahati</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium shrink-0">Specialization:</span>
                  <span className="text-lg font-semibold text-right">Robotics & Simulation</span>
                </div>
                {/* <div className="flex justify-between items-start gap-4">
                  <span className="text-sm text-slate-600 dark:text-slate-400 font-medium shrink-0">GATE Score:</span>
                  <span className="text-lg font-semibold text-right">98.79 Percentile</span>
                </div> */}
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-lg mb-6">Skills & Languages</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Programming</p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'C/C++', 'MATLAB'].map((lang) => (
                      <span key={lang} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Frameworks</p>
                  <div className="flex flex-wrap gap-2">
                    {['ROS/ROS2', 'PyTorch', 'Simulink', 'Docker'].map((fw) => (
                      <span key={fw} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-2">Tools</p>
                  <div className="flex flex-wrap gap-2">
                    {['SolidWorks', 'Gazebo', 'Unreal Engine 5', 'Isaac Sim'].map((tool) => (
                      <span key={tool} className="px-3 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-lg mb-4">Beyond Work</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                When I'm not building simulators or debugging control algorithms, I will either be on tennis court of football field or watching a movie.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                My journey till today has taught me the value of collaboration, innovation, and never stopping to learn. Always excited to work on challenging robotics problems!
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

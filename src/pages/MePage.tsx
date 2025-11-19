import Layout from '@/components/Layout';
import { Zap, Mail, Linkedin, Github, Twitter } from 'lucide-react';

export default function MePage() {
  return (
    <Layout>
      <section className="pt-4 pb-2">
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
          </div>
        </div>

        {/* Research Interests Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Research Interests</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-slate-100">Robotics and Autonomous Systems</h3>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-slate-100">Autonomous Marine Systems</h3>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-slate-100">Modeling, Simulation and Digital Twins</h3>
            </div>
            <div className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700">
              <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-slate-100">Vision Language Action models</h3>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="mailto:pruthviraj3629@gmail.com"
              className="group flex items-center justify-start gap-3 px-6 py-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
            >
              <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0" />
              <span className="text-slate-900 dark:text-slate-100 font-medium group-hover:underline">pruthviraj3629@gmail.com</span>
            </a>

            <a
              href="https://linkedin.com/in/pruthviraj-mane"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-start gap-3 px-6 py-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
            >
              <Linkedin className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0" />
              <span className="text-slate-900 dark:text-slate-100 font-medium group-hover:underline">pruthviraj-mane</span>
            </a>

            <a
              href="https://github.com/pruthvi54"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-start gap-3 px-6 py-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
            >
              <Github className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0" />
              <span className="text-slate-900 dark:text-slate-100 font-medium group-hover:underline">pruthvi54</span>
            </a>

            <a
              href="https://x.com/pruthvi_mane_"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-start gap-3 px-6 py-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
            >
              <Twitter className="w-5 h-5 text-slate-600 dark:text-slate-400 shrink-0" />
              <span className="text-slate-900 dark:text-slate-100 font-medium group-hover:underline">@pruthvi_mane_</span>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import Layout from '@/components/Layout';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      value: 'pruthviraj3629@gmail.com',
      link: 'mailto:pruthviraj3629@gmail.com',
      color: 'blue'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/pruthviraj-mane',
      link: 'https://linkedin.com/in/pruthviraj-mane',
      color: 'purple'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/pruthvi54',
      link: 'https://github.com/pruthvi54',
      color: 'slate'
    }
    // {
    //   icon: Github,
    //   title: 'ACC Project',
    //   value: 'Adaptive Cruise Control Repo',
    //   link: 'https://github.com/pruthvi54/Adaptive_cruise_control',
    //   color: 'pink'
    // }
  ];

  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800',
    purple: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800',
    slate: 'from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20 border-slate-200 dark:border-slate-800',
    pink: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-pink-200 dark:border-pink-800'
  };

  const textColorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    slate: 'text-slate-600 dark:text-slate-400',
    pink: 'text-pink-600 dark:text-pink-400'
  };

  return (
    <Layout>
      <section className="py-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-bold">Let's Connect</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">I'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactMethods.map((method, idx) => {
            const Icon = method.icon;
            const bgClass = colorClasses[method.color as keyof typeof colorClasses];
            const textClass = textColorClasses[method.color as keyof typeof textColorClasses];
            
            return (
              <a
                key={idx}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group p-8 rounded-xl bg-gradient-to-br ${bgClass} border-2 hover:shadow-lg transition-all`}
              >
                <Icon className={`w-8 h-8 mb-4 ${textClass}`} />
                <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                <p className={`${textClass} font-medium group-hover:underline`}>{method.value}</p>
              </a>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white rounded-xl p-12 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Open to Collaborations</h2>
          <p className="text-lg opacity-90 mb-6">
            Whether it's robotics, simulation projects, or research collaborations—feel free to reach out!
          </p>
          <p className="opacity-75">
            I typically respond within 24-48 hours. Looking forward to connecting with you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-4">What I'm Looking For</h3>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                <span>Research collaborations in robotics and simulation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-600 dark:text-purple-400 font-bold">✓</span>
                <span>AUV and marine robotics projects</span>
              </li>
              <li className="flex gap-3">
                <span className="text-pink-600 dark:text-pink-400 font-bold">✓</span>
                <span>EV control systems and ADAS</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                <span>Simulation and modeling opportunities</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-8 border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-4">Response Time</h3>
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <div>
                <p className="font-medium text-slate-900 dark:text-white">Email</p>
                <p className="text-sm">24-48 hours</p>
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">LinkedIn</p>
                <p className="text-sm">2-3 days</p>
              </div>
              {/* <div>
                <p className="font-medium text-slate-900 dark:text-white">Twitter</p>
                <p className="text-sm">Variable</p>
              </div> */}
              <div>
                <p className="font-medium text-slate-900 dark:text-white">GitHub Issues</p>
                <p className="text-sm">1-2 weeks</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

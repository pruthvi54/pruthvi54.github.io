import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ArrowRight, Zap } from 'lucide-react';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'research', label: 'Research' },
    { id: 'projects', label: 'Projects' },
    { id: 'publications', label: 'Publications' },
    { id: 'me', label: 'Me' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            AC
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${
                    activeSection === item.id
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Home Section */}
        <section id="home" className="mb-32 min-h-screen flex items-center">
          <div className="grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                  Welcome to my portfolio
                </div>
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Sarah</span>
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  AI researcher and machine learning engineer passionate about building intelligent systems that solve real-world problems.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('experience')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  Explore My Work <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 border-2 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  Get in Touch
                </button>
              </div>

              <div className="flex gap-6 pt-4">
                <div>
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Research Papers</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">10+</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Projects</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">5+</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Years Experience</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 md:h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-3xl"></div>
              <div className="relative w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <div className="text-white text-center">
                  <div className="text-8xl mb-2">👩‍🔬</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-32">
          <div className="space-y-4 mb-12">
            <h2 className="text-5xl font-bold">Experience</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">My professional journey in AI and machine learning</p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'Senior AI Researcher',
                company: 'Stanford University',
                period: 'Jan 2024 - Present',
                description: 'Leading research on multimodal learning systems and developing novel architectures for vision-language models.',
                highlights: ['94% accuracy on benchmarks', '40% faster inference', '3 publications']
              },
              {
                title: 'ML Engineer',
                company: 'MIT CSAIL',
                period: 'Jul 2023 - Dec 2023',
                description: 'Implemented real-time 3D point cloud processing for autonomous systems and robotics applications.',
                highlights: ['Real-time processing', 'Edge deployment', '5+ collaborators']
              },
              {
                title: 'Research Assistant',
                company: 'UC Berkeley',
                period: 'Aug 2022 - Jun 2023',
                description: 'Developed multilingual NLP models for low-resource languages with focus on data efficiency.',
                highlights: ['50+ languages', '100K+ documents', 'Cross-lingual performance']
              }
            ].map((exp, idx) => (
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

        {/* Research Section */}
        <section id="research" className="mb-32">
          <div className="space-y-4 mb-12">
            <h2 className="text-5xl font-bold">Research Focus</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Areas of expertise and active research</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'Multimodal Learning', desc: 'Combining vision and language for intelligent systems' },
              { icon: '👁️', title: 'Computer Vision', desc: 'Advanced image processing and 3D understanding' },
              { icon: '💬', title: 'Natural Language', desc: 'Multilingual models and cross-lingual transfer' },
              { icon: '⚡', title: 'Optimization', desc: 'Efficient algorithms for real-time inference' },
              { icon: '🤖', title: 'Robotics', desc: 'Autonomous systems and perception' },
              { icon: '📊', title: 'Data Science', desc: 'Large-scale dataset processing and analysis' }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <div className="space-y-4 mb-12">
            <h2 className="text-5xl font-bold">Projects</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Selected work and implementations</p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: 'Vision-Language Model',
                desc: 'End-to-end framework for training on combined vision and language data',
                tags: ['PyTorch', 'Vision', 'NLP', 'CUDA'],
                status: 'Active'
              },
              {
                title: '3D Point Cloud Processor',
                desc: 'Real-time segmentation and analysis for autonomous systems',
                tags: ['3D Vision', 'Real-time', 'Robotics'],
                status: 'Published'
              },
              {
                title: 'Multilingual NLP Pipeline',
                desc: 'Automated processing for 50+ languages with cross-lingual capabilities',
                tags: ['NLP', 'Python', 'Data Pipeline'],
                status: 'Active'
              },
              {
                title: 'ML Visualization Tool',
                desc: 'Interactive web-based tool for understanding model behavior',
                tags: ['React', 'D3.js', 'Web'],
                status: 'Published'
              }
            ].map((proj, idx) => (
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
                <p className="text-slate-600 dark:text-slate-400 mb-4">{proj.desc}</p>
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

        {/* Publications Section */}
        <section id="publications" className="mb-32">
          <div className="space-y-4 mb-12">
            <h2 className="text-5xl font-bold">Publications</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Academic contributions and research papers</p>
          </div>

          <div className="space-y-4">
            {[
              {
                title: 'Efficient Multimodal Learning with Cross-Modal Attention',
                authors: 'Chen, S., Smith, J., & Johnson, K.',
                venue: 'ICML 2024',
                year: 2024
              },
              {
                title: 'Real-Time 3D Object Detection in Point Clouds',
                authors: 'Chen, S., Lee, M., & Wang, X.',
                venue: 'CVPR 2023',
                year: 2023
              },
              {
                title: 'Building Multilingual Language Models for Low-Resource Languages',
                authors: 'Chen, S., Patel, R., & Kumar, A.',
                venue: 'ACL 2023',
                year: 2023
              }
            ].map((pub, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">{pub.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{pub.authors}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{pub.venue}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{pub.year}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Me Section */}
        <section id="me" className="mb-32">
          <div className="space-y-4 mb-12">
            <h2 className="text-5xl font-bold">About Me</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Beyond research and code</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                I'm passionate about creating AI systems that make a real difference. When I'm not diving into research papers or writing code, you'll find me exploring the intersection of technology and creativity.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                I believe in open science and love collaborating with researchers worldwide. My goal is to make advanced AI accessible and understandable to everyone.
              </p>
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-slate-700 dark:text-slate-300">Coffee enthusiast and problem solver</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-slate-700 dark:text-slate-300">Open source contributor</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  <span className="text-slate-700 dark:text-slate-300">Lifelong learner</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-lg mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Location</p>
                  <p className="font-medium">San Francisco, CA</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Education</p>
                  <p className="font-medium">PhD in Computer Science</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Languages</p>
                  <p className="font-medium">Python, C++, JavaScript, Rust</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Interests</p>
                  <p className="font-medium">AI, Music, Photography, Travel</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-20">
          <div className="space-y-4 mb-12">
            <h2 className="text-5xl font-bold">Let's Connect</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">I'd love to hear from you</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <a
              href="mailto:sarah@example.com"
              className="group p-8 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">sarah@example.com</p>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-bold text-lg mb-2">LinkedIn</h3>
              <p className="text-purple-600 dark:text-purple-400 font-medium group-hover:underline">linkedin.com/in/sarahchen</p>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/20 dark:to-slate-800/20 border-2 border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">🐙</div>
              <h3 className="font-bold text-lg mb-2">GitHub</h3>
              <p className="text-slate-600 dark:text-slate-400 font-medium group-hover:underline">github.com/sarahchen</p>
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border-2 border-pink-200 dark:border-pink-800 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">𝕏</div>
              <h3 className="font-bold text-lg mb-2">Twitter</h3>
              <p className="text-pink-600 dark:text-pink-400 font-medium group-hover:underline">@sarahchen_ai</p>
            </a>
          </div>

          <div className="text-center p-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <h3 className="text-2xl font-bold mb-2">Open to Collaborations</h3>
            <p>Whether it's research, projects, or just a chat about AI—feel free to reach out!</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 text-center text-slate-600 dark:text-slate-400">
          <p className="mb-2">Designed and built with React, Tailwind CSS, and ❤️</p>
          <p className="text-sm">© {new Date().getFullYear()} Sarah Chen. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

// TEMPLATE: Copy this file to create new project pages
// 1. Copy this entire folder to: src/pages/projects/your-project-name/
// 2. Update data.ts with your content
// 3. Rename component below to match your project
// 4. Add to App.tsx routing and ProjectsPage.tsx

import { useLocation } from 'wouter';
import { ArrowLeft, Github, ExternalLink, Play } from 'lucide-react';
import Layout from '@/components/Layout';
import { projectData } from './data';

export default function ProjectTemplate() {
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
              <h1 className="text-5xl font-bold mb-4">{projectData.title}</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                {projectData.shortDescription}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              projectData.status === 'Active' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                : projectData.status === 'Published'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
            }`}>
              {projectData.status}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {projectData.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex gap-4">
            {projectData.githubUrl && (
              <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {!projectData.githubUrl && (
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg opacity-50 cursor-not-allowed">
                <Github className="w-4 h-4" />
                GitHub (Coming Soon)
              </button>
            )}
            {projectData.documentationUrl && (
              <a href={projectData.documentationUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                <ExternalLink className="w-4 h-4" />
                Documentation
              </a>
            )}
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
              {projectData.overview.paragraphs.map((para, i) => (
                <p key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>

            {/* Key Features */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <div className="space-y-4">
                {projectData.features.map((feature, idx) => (
                  <div key={idx} className={`p-4 rounded-lg border-l-4 border-${feature.color}-500 bg-${feature.color}-50 dark:bg-${feature.color}-900/20`}>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Details */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Technical Implementation</h2>
              <div className="space-y-4">
                {projectData.technicalDetails.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400 ml-4">
                      {section.points.map((point, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Media</h2>
              
              {/* Demo Video */}
              {projectData.media.demoVideo.url ? (
                <div className="mb-6">
                  <video controls className="w-full rounded-xl mb-4">
                    <source src={projectData.media.demoVideo.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                    {projectData.media.demoVideo.caption}
                  </p>
                </div>
              ) : (
                <div className="mb-6">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <p className="text-xl font-semibold">Demo Video Coming Soon</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
                    {projectData.media.demoVideo.caption}
                  </p>
                </div>
              )}

              {/* Screenshots */}
              <div className="grid grid-cols-2 gap-4">
                {projectData.media.images.map((img, idx) => (
                  img.url ? (
                    <div key={idx}>
                      <img 
                        src={img.url} 
                        alt={img.alt}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                        {img.caption}
                      </p>
                    </div>
                  ) : (
                    <div key={idx} className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <p className="text-slate-500 dark:text-slate-400 text-sm text-center px-4">
                        {img.caption}
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Results & Impact</h2>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                  {projectData.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span dangerouslySetInnerHTML={{ __html: result }} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl sticky top-4">
              <h3 className="font-bold text-lg mb-4">Project Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Duration:</span>
                  <span className="font-medium text-right">{projectData.duration}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Institution:</span>
                  <span className="font-medium text-right">{projectData.institution}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Role:</span>
                  <span className="font-medium text-right">{projectData.role}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Team Size:</span>
                  <span className="font-medium text-right">{projectData.teamSize}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-500 dark:text-slate-400 shrink-0">Status:</span>
                  <span className={`font-medium text-right ${
                    projectData.status === 'Active' 
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-purple-600 dark:text-purple-400'
                  }`}>
                    {projectData.status === 'Active' ? 'Active Development' : projectData.status}
                  </span>
                </div>
              </div>

              {projectData.relatedWork.length > 0 && (
                <>
                  <hr className="border-slate-200 dark:border-slate-800 my-6" />
                  <div>
                    <h3 className="font-bold text-lg mb-3">Related Work</h3>
                    <div className="space-y-2 text-sm">
                      {projectData.relatedWork.map((work, idx) => (
                        work.url ? (
                          <a key={idx} href={work.url} className="block text-blue-600 dark:text-blue-400 hover:underline">
                            {work.title} →
                          </a>
                        ) : (
                          <p key={idx} className="text-slate-600 dark:text-slate-400">
                            {work.title} (Coming Soon)
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                </>
              )}
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


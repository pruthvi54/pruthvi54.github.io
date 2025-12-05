import { useLocation } from 'wouter';
import { ArrowLeft, Github, ExternalLink, FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import { projectData } from './data';
import { useEffect } from 'react';

export default function EvTorqueVectoring() {
  const [, setLocation] = useLocation();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <p className="text-xl text-slate-700 dark:text-white">
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
            {projectData.paperUrl && (
              <a href={projectData.paperUrl} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                <FileText className="w-4 h-4" />
                Paper
              </a>
            )}
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-800 mb-12" />

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Overview - With Justified Text */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              {projectData.overview.paragraphs.map((para, i) => (
                <p key={i} className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify" dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>

            {/* Vehicle Dynamics Model */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Vehicle Dynamics Model</h2>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                The vehicle is represented using a <strong>lateral dynamics model</strong> with key inputs:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4 mb-4">
                <li>Steering angle</li>
                <li>Vehicle geometry</li>
                <li>Tire behavior</li>
                <li>Mass distribution</li>
              </ul>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                The maneuver used for evaluation is a <strong>double lane-change</strong>, a challenging test designed to expose instability at higher speeds. Before applying controllers, the baseline behavior is examined.
              </p>
              
              {/* Steering Input Image */}
              {projectData.media.images[1] && (
                <div className="mb-6">
                  <img 
                    src={projectData.media.images[1].url} 
                    alt={projectData.media.images[1].alt}
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[1].caption}
                  </p>
                </div>
              )}
            </div>

            {/* System Response Without Control - Content then Images */}
            <div>
              <h2 className="text-3xl font-bold mb-4">System Response Without Control</h2>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                When the vehicle performs the lane-change maneuver with <strong>no control</strong>:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4 mb-4">
                <li>Yaw rate becomes oscillatory, showing poor directional tracking</li>
                <li>Side-slip increases rapidly, indicating lateral instability</li>
                <li>At high speeds, both effects become significantly worse</li>
              </ul>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                This motivates the need for active yaw-moment generation.
              </p>
              
              {/* Uncontrolled Images - Grouped together */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {projectData.media.images[2] && (
                  <div>
                    <img 
                      src={projectData.media.images[2].url} 
                      alt={projectData.media.images[2].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[2].caption}
                    </p>
                  </div>
                )}
                {projectData.media.images[3] && (
                  <div>
                    <img 
                      src={projectData.media.images[3].url} 
                      alt={projectData.media.images[3].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[3].caption}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Control Strategies Introduction */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Control Strategies for Yaw Moment Computation</h2>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                Three controllers are evaluated to compute the stabilizing yaw moment using torque vectoring. Each one regulates the variables differently and produces a distinct response profile.
              </p>
            </div>

            {/* SMC - Content then Images */}
            <div>
              <h2 className="text-3xl font-bold mb-4">1. Sliding Mode Control (SMC)</h2>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                {projectData.features[0].description}
              </p>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Characteristics</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4">
                  {projectData.features[0].characteristics.map((char, i) => (
                    <li key={i}>{char}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">What Happens in the Maneuver</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4">
                  {projectData.features[0].whatHappens.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* SMC Images - Grouped together */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {projectData.media.images[4] && (
                  <div>
                    <img 
                      src={projectData.media.images[4].url} 
                      alt={projectData.media.images[4].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[4].caption}
                    </p>
                  </div>
                )}
                {projectData.media.images[5] && (
                  <div>
                    <img 
                      src={projectData.media.images[5].url} 
                      alt={projectData.media.images[5].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[5].caption}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* LQR - Content then Images */}
            <div>
              <h2 className="text-3xl font-bold mb-4">2. Linear Quadratic Regulator (LQR)</h2>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                {projectData.features[1].description}
              </p>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Characteristics</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4">
                  {projectData.features[1].characteristics.map((char, i) => (
                    <li key={i}>{char}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">What Happens in the Maneuver</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4">
                  {projectData.features[1].whatHappens.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* LQR Images - Grouped together */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {projectData.media.images[6] && (
                  <div>
                    <img 
                      src={projectData.media.images[6].url} 
                      alt={projectData.media.images[6].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[6].caption}
                    </p>
                  </div>
                )}
                {projectData.media.images[7] && (
                  <div>
                    <img 
                      src={projectData.media.images[7].url} 
                      alt={projectData.media.images[7].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[7].caption}
                    </p>
                  </div>
                )}
                {projectData.media.images[8] && (
                  <div>
                    <img 
                      src={projectData.media.images[8].url} 
                      alt={projectData.media.images[8].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[8].caption}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* MPC - Content then Images */}
            <div>
              <h2 className="text-3xl font-bold mb-4">3. Model Predictive Control (MPC)</h2>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                {projectData.features[2].description}
              </p>
              
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Characteristics</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4">
                  {projectData.features[2].characteristics.map((char, i) => (
                    <li key={i}>{char}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">What Happens in the Maneuver</h3>
                <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4">
                  {projectData.features[2].whatHappens.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* MPC Images - Grouped together */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {projectData.media.images[9] && (
                  <div>
                    <img 
                      src={projectData.media.images[9].url} 
                      alt={projectData.media.images[9].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[9].caption}
                    </p>
                  </div>
                )}
                {projectData.media.images[10] && (
                  <div>
                    <img 
                      src={projectData.media.images[10].url} 
                      alt={projectData.media.images[10].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[10].caption}
                    </p>
                  </div>
                )}
                {projectData.media.images[11] && (
                  <div>
                    <img 
                      src={projectData.media.images[11].url} 
                      alt={projectData.media.images[11].alt}
                      className="w-full h-64 object-contain rounded-lg shadow-md"
                    />
                    <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                      {projectData.media.images[11].caption}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Technical Details */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Technical Implementation</h2>
              <div className="space-y-4">
                {projectData.technicalDetails.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4">
                      {section.points.map((point, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Key Takeaways</h2>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                <ul className="space-y-3 text-slate-900 dark:text-slate-100">
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

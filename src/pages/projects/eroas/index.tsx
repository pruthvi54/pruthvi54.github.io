import { useLocation } from 'wouter';
import { ArrowLeft, Github, ExternalLink, FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import { projectData } from './data';
import { useState } from 'react';

export default function Eroas() {
  const [, setLocation] = useLocation();
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [videoError, setVideoError] = useState(false);
  
  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

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
            
            {/* VIDEO FIRST - Before Overview */}
            {projectData.media.demoVideo.url && (
              <div className="mb-8">
                {videoError ? (
                  <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl shadow-lg flex items-center justify-center">
                    <p className="text-slate-600 dark:text-slate-400 text-center px-4">
                      Video file not found: {projectData.media.demoVideo.url}
                      <br />
                      <span className="text-xs">Please ensure the file exists at: public/projects/eroas/videos/</span>
                    </p>
                  </div>
                ) : (
                  <video 
                    controls 
                    className="w-full rounded-xl shadow-lg" 
                    preload="metadata"
                    onError={() => setVideoError(true)}
                  >
                    <source src={projectData.media.demoVideo.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                <p className="text-sm text-slate-600 dark:text-slate-200 text-center mt-3 italic">
                  {projectData.media.demoVideo.caption}
                </p>
              </div>
            )}

            {/* Overview - With Justified Text */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              {projectData.overview.paragraphs.map((para, i) => (
                <p key={i} className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                  {para}
                </p>
              ))}
            </div>

            {/* Reinventing Sonar Perception Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Reinventing Sonar Perception</h2>
              
              {/* Reinventing Sonar Perception Feature */}
              <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 mb-6">
                <h3 className="font-bold mb-2">{projectData.features[0].title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                  {projectData.features[0].description}
                </p>
              </div>

              {/* IMAGE 1 & 2 - After Reinventing Sonar Perception */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  {imageErrors.has(0) ? (
                    <div className="w-full min-h-64 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center px-2">Image not found: {projectData.media.images[0].url}</p>
                    </div>
                  ) : (
                    <img 
                      src={projectData.media.images[0].url} 
                      alt={projectData.media.images[0].alt}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                      onError={() => handleImageError(0)}
                    />
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[0].caption}
                  </p>
                </div>
                <div>
                  {imageErrors.has(1) ? (
                    <div className="w-full min-h-64 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center px-2">Image not found: {projectData.media.images[1].url}</p>
                    </div>
                  ) : (
                    <img 
                      src={projectData.media.images[1].url} 
                      alt={projectData.media.images[1].alt}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                      onError={() => handleImageError(1)}
                    />
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[1].caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Architecture of EROAS Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Architecture of EROAS</h2>
              
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                EROAS operates through a three-part architecture that allows an AUV to sense, decide, and react efficiently during navigation.
              </p>

              {/* SPD²C Feature */}
              <div className="p-4 rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 mb-6">
                <h3 className="font-bold mb-2">{projectData.features[1].title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                  {projectData.features[1].description}
                </p>
              </div>

              {/* IMAGE 3 - After SPD²C (Control Framework) */}
              <div className="mb-6">
                {imageErrors.has(2) ? (
                  <div className="w-full min-h-80 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center px-2">Image not found: {projectData.media.images[2].url}</p>
                  </div>
                ) : (
                  <img 
                    src={projectData.media.images[2].url} 
                    alt={projectData.media.images[2].alt}
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                    onError={() => handleImageError(2)}
                  />
                )}
                <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                  {projectData.media.images[2].caption}
                </p>
              </div>

              {/* SCG Feature */}
              <div className="p-4 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 mb-6">
                <h3 className="font-bold mb-2">{projectData.features[2].title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                  {projectData.features[2].description}
                </p>
              </div>

              {/* IMAGE 4 - After SCG (Spatial Context) */}
              <div className="mb-6">
                {imageErrors.has(3) ? (
                  <div className="w-full min-h-80 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400 text-center px-2">Image not found: {projectData.media.images[3].url}</p>
                  </div>
                ) : (
                  <img 
                    src={projectData.media.images[3].url} 
                    alt={projectData.media.images[3].alt}
                    className="w-full h-auto object-contain rounded-lg shadow-md"
                    onError={() => handleImageError(3)}
                  />
                )}
                <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                  {projectData.media.images[3].caption}
                </p>
              </div>

              {/* ST-CBF Feature */}
              <div className="p-4 rounded-lg border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 mb-4">
                <h3 className="font-bold mb-2">{projectData.features[3].title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                  {projectData.features[3].description}
                </p>
              </div>
            </div>

            {/* Simulation Environment and Experiments Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Simulation Environment and Experiments</h2>
              
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                All evaluations of EROAS were conducted in a high-fidelity underwater simulation setup using the DAVE simulator (ROS + Gazebo). The experiments used the REXROV2 AUV model, navigating through environments populated with multiple static and non-convex obstacles to test the framework's reactivity and safety.
              </p>

              {/* IMAGE 5 & 6 - Simulation Environment and Trajectory */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  {imageErrors.has(4) ? (
                    <div className="w-full min-h-64 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center px-2">Image not found: {projectData.media.images[4].url}</p>
                    </div>
                  ) : (
                    <img 
                      src={projectData.media.images[4].url} 
                      alt={projectData.media.images[4].alt}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                      onError={() => handleImageError(4)}
                    />
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[4].caption}
                  </p>
                </div>
                <div>
                  {imageErrors.has(5) ? (
                    <div className="w-full min-h-64 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center px-2">Image not found: {projectData.media.images[5].url}</p>
                    </div>
                  ) : (
                    <img 
                      src={projectData.media.images[5].url} 
                      alt={projectData.media.images[5].alt}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                      onError={() => handleImageError(5)}
                    />
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[5].caption}
                  </p>
                </div>
              </div>

              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                Performance metrics such as trajectory length, navigation time, and control smoothness were measured against widely used baseline methods like the Dynamic Window Approach (DWA) and Artificial Potential Field (APF).
              </p>

              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                Results demonstrated that EROAS achieved:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4 mb-4">
                <li className="text-justify">10–16% shorter trajectories,</li>
                <li className="text-justify">13–27% faster navigation times, and</li>
                <li className="text-justify">significantly smoother control commands (lower yaw rate oscillations).</li>
              </ul>

              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                These results confirm that EROAS can perform real-time, safe obstacle avoidance using only sonar data, with computational efficiency suitable for onboard embedded systems.
              </p>

              {/* FIG 11 & SIDE.PNG - Two views of the same result (side by side) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  {imageErrors.has(6) ? (
                    <div className="w-full min-h-64 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center px-2">Image not found: {projectData.media.images[6].url}</p>
                    </div>
                  ) : (
                    <img 
                      src={projectData.media.images[6].url} 
                      alt={projectData.media.images[6].alt}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                      onError={() => handleImageError(6)}
                    />
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[6].caption}
                  </p>
                </div>
                <div>
                  {imageErrors.has(7) ? (
                    <div className="w-full min-h-64 bg-slate-200 dark:bg-slate-800 rounded-lg shadow-md flex items-center justify-center">
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center px-2">Image not found: {projectData.media.images[7].url}</p>
                    </div>
                  ) : (
                    <img 
                      src={projectData.media.images[7].url} 
                      alt={projectData.media.images[7].alt}
                      className="w-full h-auto object-contain rounded-lg shadow-md"
                      onError={() => handleImageError(7)}
                    />
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[7].caption}
                  </p>
                </div>
              </div>
            </div>

            {/* Efficiency and Real-Time Performance Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Efficiency and Real-Time Performance</h2>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                EROAS's lightweight architecture was designed with computational simplicity in mind. Its control and decision-making modules maintain steady real-time performance (≈8 Hz)—faster than the sonar's 4 Hz acquisition rate—making it feasible for embedded AUV deployment.
              </p>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed text-justify">
                This ensures that the framework can operate continuously and efficiently during long-duration missions, where energy and timing constraints are critical.
              </p>
            </div>

            {/* Technical Implementation */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Technical Implementation</h2>
              <div className="space-y-4">
                {projectData.technicalDetails.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <ul className="list-disc list-inside space-y-2 text-slate-900 dark:text-slate-100 ml-4">
                      {section.points.map((point, i) => (
                        <li key={i} className="text-justify" dangerouslySetInnerHTML={{ __html: point }} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion Section */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                EROAS represents a new step forward in sonar-driven autonomy for AUVs. By fusing efficient perception, reactive control, and guaranteed safety, it provides a scalable foundation for real-time underwater obstacle avoidance—without relying on expensive sensors or large computational budgets.
              </p>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                The framework's modular design and open-source implementation enable researchers to extend it for broader tasks like underwater mapping, inspection, and mission planning.
              </p>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed text-justify">
                With its balance of simplicity, safety, and performance, EROAS brings us closer to a future where AUVs can operate independently in the vast, unseen world beneath the waves.
              </p>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Results & Impact</h2>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl">
                <ul className="space-y-3 text-slate-900 dark:text-slate-100">
                  {projectData.results.map((result, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-justify" dangerouslySetInnerHTML={{ __html: result }} />
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
                        <a 
                          key={idx}
                          href={work.url || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {work.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

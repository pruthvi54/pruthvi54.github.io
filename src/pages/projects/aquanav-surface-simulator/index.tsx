import { useLocation } from 'wouter';
import { ArrowLeft, Github, ExternalLink, FileText } from 'lucide-react';
import Layout from '@/components/Layout';
import { projectData } from './data';

export default function AquaNavSurfaceSimulator() {
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
                <video controls className="w-full rounded-xl shadow-lg">
                  <source src={projectData.media.demoVideo.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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

            {/* Crafting Realism Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Crafting Realism: From Waves to Light</h2>
              
              {/* Photorealistic Rendering Feature */}
              <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 mb-6">
                <h3 className="font-bold mb-2">{projectData.features[0].title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                  {projectData.features[0].description}
                </p>
              </div>

              {/* IMAGE 1 & 2 - After Photorealistic Rendering */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <img 
                    src={projectData.media.images[0].url} 
                    alt={projectData.media.images[0].alt}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[0].caption}
                  </p>
                </div>
                <div>
                  <img 
                    src={projectData.media.images[1].url} 
                    alt={projectData.media.images[1].alt}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[1].caption}
                  </p>
                </div>
              </div>

              {/* Dynamic Environmental Control Feature */}
              <div className="p-4 rounded-lg border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 mb-4">
                <h3 className="font-bold mb-2">{projectData.features[1].title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                  {projectData.features[1].description}
                </p>
              </div>

              <p className="text-slate-900 dark:text-slate-100 leading-relaxed text-justify mb-4">
                This flexibility doesn't just make AquaNav visually impressive—it makes it scientifically valuable. 
                By replicating different times and environments, AquaNav provides an unparalleled playground for 
                testing vision-based navigation algorithms.
              </p>
            </div>

            {/* Generating Knowledge Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Generating Knowledge: The Power of Synthetic Data</h2>
              
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                Collecting real-world ocean data is expensive and risky. AquaNav bridges this gap by generating 
                synthetic, co-registered RGB and depth imagery, enabling AI models to train effectively in simulated 
                conditions that closely mirror reality.
              </p>

              {/* Synthetic Data Generation Feature */}
              <div className="p-4 rounded-lg border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 mb-6">
                <h3 className="font-bold mb-2">{projectData.features[2].title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                  {projectData.features[2].description}
                </p>
              </div>

              {/* IMAGE 4 - After Synthetic Data */}
              <div className="mb-6">
                <img 
                  src={projectData.media.images[3].url} 
                  alt={projectData.media.images[3].alt}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
                <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                  {projectData.media.images[3].caption}
                </p>
              </div>

              <p className="text-slate-900 dark:text-slate-100 leading-relaxed text-justify">
                AquaNav's dataset currently includes around 800 labeled images across object categories like ship, 
                buoy, and survivor. Each frame contributes to creating robust computer vision systems capable of 
                handling real-world uncertainty—a crucial step in bridging the sim-to-real gap in autonomous 
                navigation research.
              </p>
            </div>

            {/* ROS Integration Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">From Simulation to Real Systems: ROS Integration</h2>
              
              {/* ROS Integration Feature */}
              <div className="p-4 rounded-lg border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 mb-4">
                <h3 className="font-bold mb-2">{projectData.features[3].title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                  {projectData.features[3].description}
                </p>
              </div>

              <p className="text-slate-900 dark:text-slate-100 leading-relaxed text-justify">
                Users can teleoperate the virtual USV manually or let it run autonomously via ROS nodes sending 
                velocity commands and receiving sensor feedback. This setup allows for rapid prototyping and testing 
                of perception and navigation systems before any real deployment, dramatically cutting both risk and cost.
              </p>
            </div>

            {/* Multi-Modal Perception Feature */}
            <div className="p-4 rounded-lg border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 mb-6">
              <h3 className="font-bold mb-2">{projectData.features[4].title}</h3>
              <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                {projectData.features[4].description}
              </p>
            </div>

            {/* IMAGE 3 - After Multi-Modal Perception (Full Width - 4 images side by side) */}
            <div className="mb-8">
              <img 
                src={projectData.media.images[2].url} 
                alt={projectData.media.images[2].alt}
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
              <p className="text-xs text-slate-600 dark:text-slate-200 mt-3 text-center italic">
                {projectData.media.images[2].caption}
              </p>
            </div>

            {/* Performance in Action Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Performance in Action: Vision Meets the Sea</h2>
              
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed mb-4 text-justify">
                AquaNav isn't just theoretical—it performs. In experimental tests, models trained entirely on 
                AquaNav-generated data demonstrated reliable object detection in complex maritime conditions.
              </p>

              {/* IMAGE 5 & 6 - Performance Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <img 
                    src={projectData.media.images[4].url} 
                    alt={projectData.media.images[4].alt}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[4].caption}
                  </p>
                </div>
                <div>
                  <img 
                    src={projectData.media.images[5].url} 
                    alt={projectData.media.images[5].alt}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-200 mt-2 text-center">
                    {projectData.media.images[5].caption}
                  </p>
                </div>
              </div>

              {/* Sim-to-Real Feature */}
              <div className="p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 mb-4">
                <h3 className="font-bold mb-2">{projectData.features[5].title}</h3>
                <p className="text-sm text-slate-900 dark:text-slate-100 text-justify">
                  {projectData.features[5].description}
                </p>
              </div>

              <p className="text-slate-900 dark:text-slate-100 leading-relaxed text-justify">
                When connected to ROS for real-time inference, these systems successfully identified survivors and 
                obstacles in dynamically changing environments. The ability to replicate such variability—lighting, 
                weather, and geography—allows developers to refine algorithms iteratively, achieving faster innovation 
                cycles and higher reliability when deployed in the field.
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

            {/* Towards Smarter Oceans */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Towards Smarter Oceans</h2>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed text-justify mb-4">
                AquaNav is more than just a simulator—it's a gateway to smarter, safer, and more autonomous maritime 
                systems. It empowers developers to explore, experiment, and innovate within an endlessly controllable 
                digital ocean.
              </p>
              <p className="text-slate-900 dark:text-slate-100 leading-relaxed text-justify">
                With future updates, the platform aims to expand environmental diversity and integrate new sensors, 
                further strengthening its position as a cornerstone tool for next-generation USV research.
              </p>
            </div>

            {/* Results & Impact */}
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
                  <span className="text-slate-600 dark:text-slate-200 shrink-0">Duration:</span>
                  <span className="font-medium text-right">{projectData.duration}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-600 dark:text-slate-200 shrink-0">Institution:</span>
                  <span className="font-medium text-right">{projectData.institution}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-600 dark:text-slate-200 shrink-0">Role:</span>
                  <span className="font-medium text-right">{projectData.role}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-600 dark:text-slate-200 shrink-0">Team Size:</span>
                  <span className="font-medium text-right">{projectData.teamSize}</span>
                </div>
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-600 dark:text-slate-200 shrink-0">Status:</span>
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
                          <p key={idx} className="text-slate-900 dark:text-slate-100">
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

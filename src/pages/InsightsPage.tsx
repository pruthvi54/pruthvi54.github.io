import Layout from '@/components/Layout';
import { ArrowUpRight, Calendar, Linkedin } from 'lucide-react';

const insights = [
  {
    title: 'Simulations are the need of the time — building UE5 Marine Surface Simulator',
    date: 'November 2025',
    summary:
      'Shared how AquaNav replaces costly field trials with a photorealistic UE5 marine simulator, multimodal data generation, and ROS integration for sim-to-real autonomy.',
    link: 'https://www.linkedin.com/posts/pruthviraj-mane_simulation-unrealengine-ros-activity-7400065303352889344-EbUk?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB7p0l0BJtwvHhI4dkaV0q11qltxWLgJvCc',
    platform: 'LinkedIn',
  },
  {
    title: 'Bridging ROS-Gazebo physics with Unreal Engine 5 visuals for underwater robotics',
    date: 'December 2024',
    summary:
      'Explained how pairing ROS-Gazebo dynamics with UE5 visuals unlocks better perception research and sim-to-real workflows for underwater vehicles.',
    link: 'https://www.linkedin.com/posts/pruthviraj-mane_simulation-unrealengine-rosgazebo-activity-7273612559923003393-Y8wh?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB7p0l0BJtwvHhI4dkaV0q11qltxWLgJvCc',
    platform: 'LinkedIn',
  },
];

export default function InsightsPage() {
  return (
    <Layout>
      <section className="pt-4 pb-2">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold">Insights</h1>
            <p className="mt-3 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              A running log of thoughts, demos, and experiments that I share publicly.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {insights.map((insight) => (
            <article
              key={insight.link}
              className="group bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 transition-all hover:shadow-lg"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-2">
                <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                  <Linkedin className="w-4 h-4" /> {insight.platform}
                </span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {insight.date}
                </span>
              </div>

              <h2 className="text-2xl font-semibold mb-3">{insight.title}</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{insight.summary}</p>

              <a
                href={insight.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all"
              >
                Read the full post
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}



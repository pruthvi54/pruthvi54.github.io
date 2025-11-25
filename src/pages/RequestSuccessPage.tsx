import Layout from '@/components/Layout';
import { CheckCircle2, Mail, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

export default function RequestSuccessPage() {
  const [, setLocation] = useLocation();

  return (
    <Layout>
      <section className="pt-4 pb-2">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>

          {/* Success Message */}
          <h1 className="text-5xl font-bold mb-6">Request Submitted!</h1>
          
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-lg mb-8">
            <Mail className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              Your CV request has been submitted successfully.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              I will get back to you soon with my CV and additional information.
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-8">
            <h2 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200">
              What happens next?
            </h2>
            <ul className="text-left space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>You'll receive my CV via email within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>Check your spam folder if you don't see it in your inbox</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                <span>Feel free to reach out directly if you have any questions</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setLocation('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg font-medium transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
            
            <button
              onClick={() => setLocation('/me')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-md"
            >
              Learn More About Me
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Need to reach me urgently?
            </p>
            <a 
              href="mailto:pruthviraj3629@gmail.com"
              className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:underline font-medium"
            >
              <Mail className="w-4 h-4" />
              pruthviraj3629@gmail.com
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}


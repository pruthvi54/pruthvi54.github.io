import Layout from '@/components/Layout';
import { FileText, Mail, Building2, MessageSquare } from 'lucide-react';

export default function RequestCVPage() {
  return (
    <Layout>
      <section className="pt-4 pb-2">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 mb-6">
              <FileText className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Request CV</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Please fill out the form below and I'll get back to you with my CV as soon as possible.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-lg">
            <form 
              action="https://formspree.io/f/YOUR_FORMSPREE_ID" 
              method="POST"
              className="space-y-6"
            >
              {/* 
                SETUP INSTRUCTIONS:
                1. Go to https://formspree.io/ and sign up (free)
                2. Create a new form
                3. Copy your form endpoint ID (looks like: mabcd1234)
                4. Replace "YOUR_FORMSPREE_ID" above with your actual ID
                5. Update the _redirect URL below to match your GitHub Pages domain
              */}
              
              {/* Hidden redirect field - Update with your actual domain */}
              <input 
                type="hidden" 
                name="_redirect" 
                value="https://pruthvi54.github.io/request-success" 
              />
              
              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  aria-required="true"
                  aria-describedby="email-description"
                />
                <p id="email-description" className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  I'll use this email to send you my CV
                </p>
              </div>

              {/* Organization Field */}
              <div>
                <label 
                  htmlFor="organization" 
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  <Building2 className="w-4 h-4" />
                  Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="organization"
                  type="text"
                  name="organization"
                  required
                  placeholder="Your company or institution"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  aria-required="true"
                />
              </div>

              {/* Purpose Field */}
              <div>
                <label 
                  htmlFor="purpose" 
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Purpose of Request <span className="text-slate-400 text-xs font-normal">(Optional)</span>
                </label>
                <textarea
                  id="purpose"
                  name="purpose"
                  rows={4}
                  placeholder="Please let me know how you'd like to connect or what opportunity you're considering me for..."
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-y"
                  aria-describedby="purpose-description"
                />
                <p id="purpose-description" className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Optional: Help me understand your request better
                </p>
              </div>

              {/* Anti-spam honeypot field (hidden from users) */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <FileText className="w-5 h-5" />
                  Submit Request
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-center text-slate-500 dark:text-slate-400 pt-2">
                Your information will only be used to send you my CV and will not be shared with third parties.
              </p>
            </form>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Prefer to reach out directly?{' '}
              <a 
                href="mailto:pruthviraj3629@gmail.com" 
                className="text-green-600 dark:text-green-400 hover:underline font-medium"
              >
                Send me an email
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}


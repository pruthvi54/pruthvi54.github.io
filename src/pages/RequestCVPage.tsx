import Layout from '@/components/Layout';
import { FileText, Mail, Building2, MessageSquare, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState } from 'react';

// ⚠️ SETUP REQUIRED: Replace this with your actual Formspree Form ID
// Get it from: https://formspree.io/ → Create Form → Copy the ID (e.g., "mabcd1234")
const FORMSPREE_ENDPOINT = "xjkdqabv";
const IS_TEST_MODE = FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ID";

export default function RequestCVPage() {
  const [, setLocation] = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (IS_TEST_MODE) {
      // Test mode: Just redirect to success page for UI testing
      // In production, replace FORMSPREE_ENDPOINT with your actual Formspree ID
      setIsSubmitting(true);
      setTimeout(() => {
        setLocation('/request-success');
      }, 500);
      return;
    }

    // Real mode: Submit to Formspree
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add redirect URL for Formspree
    formData.append('_redirect', `${window.location.origin}/request-success`);
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ENDPOINT}`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Redirect to success page
        setLocation('/request-success');
      } else {
        const data = await response.json();
        alert(`Error: ${data.error || 'Form submission failed. Please try again or email me directly.'}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      alert('Network error. Please try again or email me directly at pruthviraj3629@gmail.com');
      setIsSubmitting(false);
    }
  };

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

          {/* Test Mode Notice */}
          {IS_TEST_MODE && (
            <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                  Test Mode Active
                </p>
                <p className="text-yellow-700 dark:text-yellow-400">
                  Form submissions are currently in test mode. To enable email notifications, please set up Formspree and update the <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">FORMSPREE_ENDPOINT</code> in <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">RequestCVPage.tsx</code>
                </p>
              </div>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-lg">
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
            >
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
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                >
                  <FileText className="w-5 h-5" />
                  {isSubmitting ? 'Submitting...' : 'Submit Request'}
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


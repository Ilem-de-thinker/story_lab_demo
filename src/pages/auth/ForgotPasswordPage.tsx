import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ForgotPasswordPage: React.FC = () => {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Recovery link sent to your inbox', 'success');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <span className="font-editorial text-4xl text-[#191919] dark:text-white">Quillora</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
        </Link>
        <h2 className="font-serif-display text-2xl text-[#191919] dark:text-[#F3F4F6]">
          Recover your access
        </h2>
        <p className="mt-1 text-xs text-[#77736E] dark:text-[#9CA3AF]">
          We'll send you an instructions link to reset your account password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FFFFFF] dark:bg-[#151A24] py-8 px-6 sm:px-10 border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg shadow-2xs">
          {submitted ? (
            <div className="text-center py-4 space-y-4">
              <CheckCircle2 size={40} className="text-[#2563EB] dark:text-[#60A5FA] mx-auto" />
              <h3 className="font-serif-display text-xl text-[#191919] dark:text-[#F3F4F6]">
                Check your inbox
              </h3>
              <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed">
                We sent a recovery dispatch to <strong className="text-[#191919] dark:text-[#F3F4F6]">{email}</strong>. Follow the instructions inside to set a fresh password.
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#2563EB] dark:text-[#60A5FA] hover:underline"
                >
                  <ArrowLeft size={13} />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="author@publication.org"
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB] transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors disabled:opacity-50"
              >
                {loading ? 'Transmitting...' : 'Send Recovery Dispatch'}
              </button>

              <div className="pt-4 border-t border-[#E9E6E0] dark:border-[#272E3B] text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white transition-colors"
                >
                  <ArrowLeft size={13} />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

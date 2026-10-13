import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { updateCurrentUser, showToast } = useApp();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!username.trim()) newErrors.username = 'Username handle is required';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Please enter a valid email address';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!agreedToTerms) newErrors.terms = 'You must accept the terms of publication';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      updateCurrentUser({
        name: name.trim(),
        username: username.trim().toLowerCase().replace(/[^a-z0-9_]/g, ''),
      });
      showToast('Account created! Welcome to Quillora.', 'success');
      setLoading(false);
      navigate('/onboarding');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <span className="font-editorial text-4xl text-[#191919] dark:text-white">Quillora</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
        </Link>
        <h2 className="font-serif-display text-2xl text-[#191919] dark:text-[#F3F4F6]">
          Create your writer profile
        </h2>
        <p className="mt-1 text-xs text-[#77736E] dark:text-[#9CA3AF]">
          Join an independent community devoted to the craft of deliberate prose.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FFFFFF] dark:bg-[#151A24] py-8 px-6 sm:px-10 border border-[#E9E6E0] dark:border-[#272E3B] rounded-lg shadow-2xs">
          {/* Google Sign-Up Button */}
          <button
            type="button"
            onClick={() => {
              showToast('Google authentication simulated for demo', 'info');
              navigate('/onboarding');
            }}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-[#E9E6E0] dark:border-[#272E3B] rounded text-xs font-medium text-[#191919] dark:text-[#F3F4F6] hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430] transition-colors mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign up with Google</span>
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E9E6E0] dark:border-[#272E3B]" />
            </div>
            <div className="relative flex justify-center text-xs text-[#77736E] dark:text-[#9CA3AF] uppercase">
              <span className="bg-[#FFFFFF] dark:bg-[#151A24] px-2">or with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Elena Rostova"
                className="w-full px-3 py-2 text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB] transition-colors"
              />
              {errors.name && <p className="text-xs text-[#C44949] mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] mb-1">
                Username Handle
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-[#77736E] dark:text-[#9CA3AF]">@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="erostova"
                  className="w-full pl-7 pr-3 py-2 text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB] transition-colors"
                />
              </div>
              {errors.username && <p className="text-xs text-[#C44949] mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="author@publication.org"
                className="w-full px-3 py-2 text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB] transition-colors"
              />
              {errors.email && <p className="text-xs text-[#C44949] mt-1">{errors.email}</p>}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white inline-flex items-center gap-1"
                >
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                  <span>{showPassword ? 'Hide' : 'Show'}</span>
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full px-3 py-2 text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB] transition-colors"
              />

              {/* Password strength feedback */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`flex-1 rounded-full transition-colors ${
                          strength >= step
                            ? strength <= 2
                              ? 'bg-[#C44949]'
                              : strength === 3
                              ? 'bg-amber-500'
                              : 'bg-[#2563EB]'
                            : 'bg-[#E9E6E0] dark:bg-[#272E3B]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#77736E] dark:text-[#9CA3AF]">
                    {strength <= 1
                      ? 'Weak password'
                      : strength === 2
                      ? 'Fair (add capital or number)'
                      : strength === 3
                      ? 'Good password'
                      : 'Strong password'}
                  </span>
                </div>
              )}
              {errors.password && <p className="text-xs text-[#C44949] mt-1">{errors.password}</p>}
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-[#E9E6E0] dark:border-[#272E3B] text-[#2563EB] focus:ring-[#2563EB]"
                />
                <span className="text-xs text-[#77736E] dark:text-[#9CA3AF] leading-relaxed">
                  I agree to the Quillora Community Guidelines and understand this platform prioritizes thoughtful reading over clickbait.
                </span>
              </label>
              {errors.terms && <p className="text-xs text-[#C44949] mt-1">{errors.terms}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? 'Creating Profile...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#77736E] dark:text-[#9CA3AF]">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2563EB] dark:text-[#60A5FA] font-medium hover:underline">
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

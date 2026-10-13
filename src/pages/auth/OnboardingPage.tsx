import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { AuthorAvatar } from '../../components/common/AuthorAvatar';
import { FollowButton } from '../../components/common/FollowButton';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, updateCurrentUser, authors, showToast } = useApp();

  const [step, setStep] = useState(1);

  // Step 1: Interests
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'The Craft of Writing',
    'African Technology',
  ]);

  const interestOptions = [
    'The Craft of Writing',
    'African Technology',
    'Creative Nonfiction',
    'Philosophy of Mind',
    'Digital Craftsmanship',
    'Poetry & Translation',
    'Memoir & Personal History',
    'Literary Criticism',
    'Slow Living & Solitude',
  ];

  // Step 2: Writing Goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Publishing long-form essays',
  ]);

  const goalOptions = [
    { title: 'Publishing long-form essays', desc: 'Craft in-depth arguments and literary treatises.' },
    { title: 'Cultivating daily journaling', desc: 'Build steady momentum through quiet morning prose.' },
    { title: 'Sharing serialized fiction & verse', desc: 'Release recurring chapters and poetry sequences.' },
    { title: 'Documenting engineering philosophy', desc: 'Bridge technical architecture with human meaning.' },
    { title: 'Curating reading marginalia', desc: 'Discuss and annotate formative texts with readers.' },
  ];

  // Step 3: Complete Profile
  const [bio, setBio] = useState(currentUser.bio || '');
  const [location, setLocation] = useState(currentUser.location || 'Edinburgh & Nairobi');
  const [website, setWebsite] = useState(currentUser.website || 'https://quillora.ink');

  // Step 4: Suggested authors to follow
  const suggestedWriters = authors.filter((a) => a.id !== currentUser.id).slice(0, 4);

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleGoal = (title: string) => {
    setSelectedGoals((prev) =>
      prev.includes(title) ? prev.filter((g) => g !== title) : [...prev, title]
    );
  };

  const handleNext = () => {
    if (step === 3) {
      updateCurrentUser({ bio, location, website });
    }
    if (step < 4) {
      setStep(step + 1);
    } else {
      showToast('Onboarding complete! Enjoy your reading & writing sanctuary.', 'success');
      navigate('/feed');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Top Header */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6 border-b border-[#E9E6E0] dark:border-[#272E3B]">
        <div className="flex items-center gap-2">
          <span className="font-editorial text-3xl text-[#191919] dark:text-white">Quillora</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308]" />
        </div>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`w-6 sm:w-8 h-1 rounded-full transition-colors ${
                s <= step ? 'bg-[#2563EB]' : 'bg-[#E9E6E0] dark:bg-[#272E3B]'
              }`}
            />
          ))}
          <span className="text-xs text-[#77736E] dark:text-[#9CA3AF] ml-2">Step {step} of 4</span>
        </div>
      </div>

      {/* Main Form Step Area */}
      <div className="max-w-2xl mx-auto w-full my-auto py-8">
        {/* Step 1: Select Interests */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
                Personalize Your Archive
              </span>
              <h2 className="font-serif-display text-3xl text-[#191919] dark:text-[#F3F4F6]">
                What domains do you read and write about?
              </h2>
              <p className="text-sm text-[#77736E] dark:text-[#9CA3AF] mt-1">
                Choose the literary traditions and technical curiosities you wish to see prioritized.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {interestOptions.map((item) => {
                const selected = selectedInterests.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`px-4 py-2 rounded text-xs font-medium transition-all border ${
                      selected
                        ? 'bg-[#EFF6FF] dark:bg-[#1E293B] text-[#2563EB] dark:text-[#60A5FA] border-[#2563EB] dark:border-[#3B82F6] font-semibold'
                        : 'bg-[#FFFFFF] dark:bg-[#151A24] text-[#191919] dark:text-[#F3F4F6] border-[#E9E6E0] dark:border-[#272E3B] hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Choose writing goals */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
                Your Calling
              </span>
              <h2 className="font-serif-display text-3xl text-[#191919] dark:text-[#F3F4F6]">
                What are your aspirations on Quillora?
              </h2>
              <p className="text-sm text-[#77736E] dark:text-[#9CA3AF] mt-1">
                This configures your default writing studio prompts and dashboard pacing.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {goalOptions.map((goal) => {
                const selected = selectedGoals.includes(goal.title);
                return (
                  <button
                    key={goal.title}
                    type="button"
                    onClick={() => toggleGoal(goal.title)}
                    className={`w-full text-left p-4 rounded-md border transition-all flex items-start justify-between ${
                      selected
                        ? 'bg-[#EFF6FF] dark:bg-[#1E293B] border-[#2563EB] dark:border-[#3B82F6]'
                        : 'bg-[#FFFFFF] dark:bg-[#151A24] border-[#E9E6E0] dark:border-[#272E3B] hover:bg-[#F1EFEA] dark:hover:bg-[#1E2430]'
                    }`}
                  >
                    <div>
                      <h4 className="font-serif-display text-base text-[#191919] dark:text-[#F3F4F6]">
                        {goal.title}
                      </h4>
                      <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] mt-0.5">{goal.desc}</p>
                    </div>
                    {selected && <Check size={18} className="text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Complete user's profile */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
                Curatorial Identity
              </span>
              <h2 className="font-serif-display text-3xl text-[#191919] dark:text-[#F3F4F6]">
                Introduce yourself to fellow readers
              </h2>
              <p className="text-sm text-[#77736E] dark:text-[#9CA3AF] mt-1">
                Your author card appears on published essays and conversational replies.
              </p>
            </div>

            <div className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-6 space-y-4">
              <div className="flex items-center gap-4">
                <AuthorAvatar
                  name={currentUser.name}
                  avatar={currentUser.avatar}
                  size="lg"
                  clickable={false}
                />
                <div>
                  <h3 className="font-serif-display text-lg text-[#191919] dark:text-[#F3F4F6]">{currentUser.name}</h3>
                  <p className="text-xs text-[#77736E] dark:text-[#9CA3AF]">@{currentUser.username}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] mb-1">
                  Author Biography (Short)
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Essayist & novelist exploring silence, memory, and the craft of deliberate living..."
                  className="w-full px-3 py-2 text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] mb-1">
                    Primary Location / Cities
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Edinburgh & Nairobi"
                    className="w-full px-3 py-2 text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#191919] dark:text-[#F3F4F6] mb-1">
                    Personal Archive / Website
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://elenarostova.ink"
                    className="w-full px-3 py-2 text-sm bg-[#FAF9F6] dark:bg-[#0E121A] text-[#191919] dark:text-[#F3F4F6] border border-[#E9E6E0] dark:border-[#272E3B] rounded focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Discover & Follow Writers */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA] font-semibold block mb-1">
                The Community
              </span>
              <h2 className="font-serif-display text-3xl text-[#191919] dark:text-[#F3F4F6]">
                Voices you might appreciate
              </h2>
              <p className="text-sm text-[#77736E] dark:text-[#9CA3AF] mt-1">
                Follow writers to begin seeding your personalized home feed with deliberate essays.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {suggestedWriters.map((writer) => (
                <div
                  key={writer.id}
                  className="bg-[#FFFFFF] dark:bg-[#151A24] border border-[#E9E6E0] dark:border-[#272E3B] rounded-md p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <AuthorAvatar
                      name={writer.name}
                      avatar={writer.avatar}
                      size="md"
                      clickable={false}
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif-display text-base text-[#191919] dark:text-[#F3F4F6] truncate">
                        {writer.name}
                      </h4>
                      <p className="text-xs text-[#77736E] dark:text-[#9CA3AF] line-clamp-1">{writer.bio}</p>
                    </div>
                  </div>
                  <FollowButton authorId={writer.id} size="sm" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between pt-6 border-t border-[#E9E6E0] dark:border-[#272E3B]">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/feed')}
            className="text-xs uppercase tracking-wider text-[#77736E] dark:text-[#9CA3AF] hover:text-[#191919] dark:hover:text-white"
          >
            Skip for now
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs uppercase tracking-wider font-medium text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded transition-colors"
        >
          <span>{step === 4 ? 'Enter Quillora' : 'Continue'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

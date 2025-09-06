import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Target, Zap, MessageCircle } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Seamless Team Collaboration',
    description:
      'Communicate and collaborate with your team efficiently in real-time. Share updates, assign tasks, and keep everyone in sync with instant notifications and group chat.',
    extra:
      'Empower your team with shared boards, direct messaging, and integrated file sharing. No more missed updates or scattered information.',
    img: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&w=800&q=80',
  },
  {
    icon: Target,
    title: 'Effective Project Management',
    description:
      'Organize projects, track tasks, and maintain deadlines effortlessly. Visualize progress with Kanban boards and milestone tracking.',
    extra:
      'Set priorities, attach files, and monitor completion rates. Automated reminders help your team stay on track and meet every deadline.',
    img: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&w=800&q=80',
  },
  {
    icon: Zap,
    title: 'Boost Your Productivity',
    description:
      'Streamline workflows and optimize your team’s output and focus. Use analytics to identify bottlenecks and improve efficiency.',
    extra:
      'Automate repetitive tasks, integrate with your favorite tools, and get actionable insights from the productivity dashboard.',
    img: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&w=800&q=80',
  },
  {
    icon: MessageCircle,
    title: 'Integrated Project Workspace',
    description:
      'Chat and share ideas in a simple, collaborative workspace for each project. Keep discussions organized and accessible.',
    extra:
      'Create topic threads, pin important messages, and share documents—all in one place. Your project’s communication hub.',
    img: 'https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&w=800&q=80',
  },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>(features.map(() => false));

  useEffect(() => {
    const onScroll = () => {
      featureRefs.current.forEach((el, idx) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight - 100) {
            setVisibleFeatures((prev) => {
              if (!prev[idx]) {
                const newArr = [...prev];
                newArr[idx] = true;
                return newArr;
              }
              return prev;
            });
          }
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 text-black font-sans">
      {/* Top-right Sign In / Sign Up */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => navigate('/auth')}
          className="px-4 py-2 font-semibold border-2 border-blue-500 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign In / Sign Up
        </button>
      </div>

      {/* Main Header */}
      <header className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-blue-700">
          SynergySphere 2.0
        </h1>
        <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8 text-gray-700">
          A modern team collaboration and project management tool inspired by Trello &amp; Asana.
        </p>
      </header>

      {/* Features Sections */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mb-32">
        {features.map(({ icon: Icon, title, description, extra, img }, idx) => (
          <div
            key={idx}
            ref={(el) => (featureRefs.current[idx] = el)}
            className={`flex flex-col md:flex-row items-center md:space-x-12 transition-opacity transition-transform duration-700 ${
              visibleFeatures[idx]
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Image on left for even, right for odd */}
            {idx % 2 === 0 ? (
              <>
                <div className="flex-1 w-full mb-6 md:mb-0">
                  <img
                    src={img}
                    alt={title}
                    className="rounded-xl shadow-lg w-full h-64 md:h-80 object-cover object-center"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 text-center md:text-left space-y-4 p-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto md:mx-0">
                    <Icon className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">{title}</h2>
                  <p className="text-gray-700 text-base md:text-lg max-w-lg mx-auto md:mx-0">{description}</p>
                  <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto md:mx-0">{extra}</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 text-center md:text-left space-y-4 p-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto md:mx-0">
                    <Icon className="w-8 h-8 text-blue-500" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">{title}</h2>
                  <p className="text-gray-700 text-base md:text-lg max-w-lg mx-auto md:mx-0">{description}</p>
                  <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto md:mx-0">{extra}</p>
                </div>
                <div className="flex-1 w-full mt-6 md:mt-0">
                  <img
                    src={img}
                    alt={title}
                    className="rounded-xl shadow-lg w-full h-64 md:h-80 object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </section>

      {/* Bottom-center Continue Button */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <button
          onClick={() => navigate('/auth')}
          className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue
          <ArrowRight size={20} className="inline-block ml-2" />
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-32 py-6 shadow-inner">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <span>&copy; 2025 SynergySphere. All rights reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="/privacy" className="hover:text-blue-500">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-500">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
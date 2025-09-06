import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, Target, Zap, MessageCircle } from 'lucide-react';
import Spline from '@splinetool/react-spline';

const features = [
  {
    icon: Users,
    title: 'Seamless Team Collaboration',
    description:
      'Communicate and collaborate with your team efficiently in real-time. SynergySphere offers threaded project-specific discussions, document sharing, and notifications so your team stays aligned and informed. Work together smoothly across devices while making sure everyone is on the same page, minimizing communication gaps and boosting team synergy.',
    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Target,
    title: 'Effective Project Management',
    description:
      'Organize projects, track tasks, and maintain deadlines effortlessly with SynergySphere. Manage all your projects in one place, assign tasks clearly with deadlines and statuses, and get a real-time overview of progress to ensure nothing slips through the cracks. Intuitive visual tools help you stay on schedule and maintain productivity from start to finish.',
    img: 'https://images.unsplash.com/photo-1542744173-05336fcc7ad4?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Zap,
    title: 'Boost Your Productivity',
    description:
      'Streamline workflows and optimize your team’s output and focus. With task assignments, clear deadlines, and progress tracking, SynergySphere helps teams stay on track and avoid surprises. Automated notifications and intuitive visualizations ensure everyone knows what to do next, reducing friction and increasing overall productivity.If you want, this can be further expanded or included as sections alongside the other content for SynergySphere.',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: MessageCircle,
    title: 'Integrated Project Workspace',
    description:
      'Chat and share ideas in a simple, collaborative workspace built for each project. SynergySphere provides a dedicated environment where team members can communicate in real-time, share files, and keep all discussions and decisions organized by project—making collaboration seamless and efficient.',
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
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

      <div className="w-screen mb-12">
        <Spline scene="https://prod.spline.design/uULgriK-HLNYzyjz/scene.splinecode" />
      </div>




      {/* Features Sections */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mb-32">
        {features.map(({ icon: Icon, title, description, img }, idx) => (
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
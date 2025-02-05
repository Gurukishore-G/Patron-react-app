import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Users as UsersIcon, 
  BarChart as BarChartIcon, 
  Video as VideoIcon, 
  Share2 as Share2Icon, 
  Box as BoxIcon 
} from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  const handleCardClick = (path: string, isExternal?: boolean) => {
    if (isExternal) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-white" />,
      iconBg: "bg-blue-500",
      title: "AI-Powered Resume Builder",
      description: "Create professional resumes with AI-driven suggestions and optimization tips.",
      path: "/resume",
      isExternal: false
    },
    {
      icon: <UsersIcon className="w-8 h-8 text-white" />,
      iconBg: "bg-green-500",
      title: "Profile Optimization",
      description: "Enhance your LinkedIn and professional profiles with AI-powered recommendations.",
      path: "/profile-optimization",
      isExternal: false
    },
    {
      icon: <BoxIcon className="w-8 h-8 text-white" />,
      iconBg: "bg-purple-500",
      title: "Job Application Automation",
      description: "Automate your job applications across multiple platforms with smart tracking.",
      path: "/job-automation",
      isExternal: false
    },
    {
      icon: <VideoIcon className="w-8 h-8 text-white" />,
      iconBg: "bg-red-500",
      title: "Interview Preparation AI",
      description: "Practice with AI-powered mock interviews and receive instant feedback.",
      path: "https://yoodli.ai/",
      isExternal: true
    },
    {
      icon: <BarChartIcon className="w-8 h-8 text-white" />,
      iconBg: "bg-blue-500",
      title: "Analytics & Insights",
      description: "Track your application success rates and receive personalized improvement tips.",
      path: "/analytics",
      isExternal: false
    },
    {
      icon: <Share2Icon className="w-8 h-8 text-white" />,
      iconBg: "bg-orange-500",
      title: "Referral Automation",
      description: "Automate referral emails using Excel templates for bulk outreach.",
      path: "/referral-automation",
      isExternal: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your AI-Powered Job Search Assistant
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Streamline your job search with AI-powered tools for resume building,
          profile optimization, and automated applications.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCardClick(feature.path, feature.isExternal)}
          >
            <div className="p-6">
              <div className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
              {feature.isExternal && (
                <div className="mt-4 text-sm text-blue-600">
                  Opens in new tab ↗
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="mt-20 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Follow us for more updates
        </h3>
        <div className="flex justify-center space-x-6">
          <a 
            href="https://www.instagram.com/patron.you/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Instagram</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/company/patronyou/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href="https://x.com/patron_you" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
import React from 'react';
import { Users, Linkedin, Briefcase } from 'lucide-react';

function ProfileOptimization() {
  const profiles = [
    {
      title: "LinkedIn Profile Optimization",
      description: "Enhance your LinkedIn profile with AI-powered recommendations",
      icon: <Linkedin className="w-8 h-8 text-blue-600" />,
      url: "https://www.linkedin.com"
    },
    // {
    //   title: "Naukri Profile Optimization",
    //   description: "Optimize your Naukri profile for better visibility",
    //   icon: <Briefcase className="w-8 h-8 text-blue-600" />,
    //   url: "https://www.naukri.com"
    // }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Users className="w-8 h-8 text-blue-500 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Profile Optimization</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profiles.map((profile, index) => (
          <a 
            key={index}
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              {profile.icon}
              <h2 className="text-xl font-semibold ml-3">{profile.title}</h2>
            </div>
            <p className="text-gray-600">{profile.description}</p>
            <div className="mt-4 text-sm text-blue-600">
              Visit site ↗
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ProfileOptimization;
import React from 'react';
import { Upload, FileText, Linkedin, Mail, Plus } from 'lucide-react';

export default function Resume() {
  const handleUpload = () => {
    // Handle file upload
  };

  const handleLinkedInFetch = () => {
    // Handle LinkedIn integration
  };

  // const handleNaukreFetch = () => {
  //   // Handle Naukri integration
  // };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Resume Builder</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button
          onClick={handleUpload}
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Upload className="w-12 h-12 text-blue-600 mb-4" />
          <span className="text-lg font-medium">Upload Resume</span>
        </button>

        {/* <button
          onClick={() => {}}
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <FileText className="w-12 h-12 text-green-600 mb-4" />
          <span className="text-lg font-medium">Paste Text</span>
        </button> */}

        <button
          onClick={handleLinkedInFetch}
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Linkedin className="w-12 h-12 text-[#0077B5] mb-4" />
          <span className="text-lg font-medium">Fetch from LinkedIn</span>
        </button>

        {/* <button
          onClick={handleNaukreFetch}
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Mail className="w-12 h-12 text-[#FF7555] mb-4" />
          <span className="text-lg font-medium">Fetch from Naukri</span>
        </button> */}

        <button
          onClick={() => {}}
          className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="w-12 h-12 text-purple-600 mb-4" />
          <span className="text-lg font-medium">Create Fresh</span>
        </button>
      </div>
    </div>
  );
}
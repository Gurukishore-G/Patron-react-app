import React from 'react';
import { Download, LogOut, ToggleLeft, ToggleRight } from 'lucide-react';

export default function Profile() {
  const connections = {
    linkedin: true,
    // naukri: false,
    // google: true
  };

  const handleSignOut = () => {
    // Handle sign out logic
  };

  const handleDownloadResume = () => {
    // Handle resume download
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 text-3xl font-bold">
                J
              </div>
              <div className="ml-6 text-white">
                <h1 className="text-3xl font-bold">John Doe</h1>
                <p className="text-blue-100">john.doe@example.com</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Connected Accounts</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">LinkedIn</span>
                {connections.linkedin ? (
                  <ToggleRight className="w-6 h-6 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
              </div>
              {/* <div className="flex items-center justify-between">
                <span className="text-gray-700">Naukri</span>
                {connections.naukri ? (
                  <ToggleRight className="w-6 h-6 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Google</span>
                {connections.google ? (
                  <ToggleRight className="w-6 h-6 text-blue-600" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-gray-400" />
                )}
              </div> */}
            </div>
          </div>

          <button
            onClick={handleDownloadResume}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Latest Resume
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-800">Patron</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link to="/resume" className="nav-link">Resume</Link>
              <Link to="/referral-automation" className="nav-link">Referrals</Link>
              {/* <Link to="/tracker" className="nav-link">Tracker</Link> */}
              {/* <Link to="/analytics" className="nav-link">Analytics</Link> */}
              <Link to="/blog" className="nav-link">Blog</Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link to="/profile" className="nav-link">Profile</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
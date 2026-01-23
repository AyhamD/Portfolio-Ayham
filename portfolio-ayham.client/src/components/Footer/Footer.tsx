import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Your Name or Company. All rights reserved.</p>
        {/* Social media links or other information can go here */}
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import '../assets/styles/globals.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="antialiased font-heading font-body">
      {children}
    </div>
  );
};

export default Layout;
// src/components/SideMenu.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu: React.FC = () => {
  return (
    <div className="side-menu">
      <h2>Navigation</h2>
      <Link to="/" className="side-menu-item">Home</Link>
      <Link to="/desktop" className="side-menu-item">Desktop</Link>
      <Link to="/downloads" className="side-menu-item">Downloads</Link>
      <Link to="/documents" className="side-menu-item">Documents</Link>
      <Link to="/harddrive" className="side-menu-item">Hard C Drive</Link>
      <Link to="/network" className="side-menu-item">Network Share</Link>
      <Link to="/cloud" className="side-menu-item">Cloud Storage</Link>
    </div>
  );
};

export default SideMenu;

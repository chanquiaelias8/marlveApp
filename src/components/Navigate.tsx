import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navigate.css';

const Navigate: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRootPath = location.pathname === '/';

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Marvel App</h1>
      <div className="navbar-links">
        <Link to="/characterForm" className="nav-link">Create Character</Link>
        <button 
          onClick={() => navigate(-1)} 
          className="nav-link back-button" 
          disabled={isRootPath}
        >
          Back
        </button>
      </div>
    </nav>
  );
};

export default Navigate;
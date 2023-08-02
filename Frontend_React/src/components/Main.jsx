// Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Main = () => {
  return (
    <header className="headercontainer">
      <div className="logo">
        <Link to="/Accueil">Accueil</Link>
      </div>
    </header>
  );
};

export default Main;

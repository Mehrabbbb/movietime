// src/pages/NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to install and set up react-router-dom

const ErrorPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="not-found-link">Go back to Home</Link>
    </div>
  );
};

export default ErrorPage;

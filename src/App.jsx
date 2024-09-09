// app.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MoviePage from './MoviePage'; // Import your MoviePage component
import HomePage from './HomePage'; // Import your HomePage component
import ErrorPage from './ErrorPage'; // Import your 404 Not Found page component

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Define the route for the home page */}
                <Route path="/" element={<HomePage />} />
                {/* Define the route for /movie/:anymovieurl */}
                <Route path="/:category/:year/:title" element={<MoviePage />} />
                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </Router>
    );
};

export default App;

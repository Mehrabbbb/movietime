// src/App.jsx

import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Row, Col, Card, Button, Form, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css';
import { fetchLatestMovieList } from './handle_api/lastest'; // Import the function
import { FaPlay } from 'react-icons/fa'; // Importing a play icon from react-icons

const App = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    useEffect(() => {
        const loadMovies = async () => {
            try {
                const moviesList = await fetchLatestMovieList();
                setMovies(moviesList);
            } catch (error) {
                console.error('Error loading movies:', error);
                setError('Failed to load movies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    const filteredMovies = movies.filter((movie) => {
        const matchesQuery = movie.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType === 'All' || movie.type === selectedType;
        return matchesQuery && matchesType;
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
                <Navbar.Brand href="#home">
                    <img src="logo.png" alt="Movie Hunt Logo" width="120" height="auto" className="d-inline-block align-top" />
                    Movie Hunt
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav>
                    <Form inline className="ml-auto d-flex">
                        <Form.Control 
                            type="text" 
                            placeholder="Search movies" 
                            value={searchQuery} 
                            onChange={handleSearchChange}
                            className="mr-sm-2 search-input"
                        />
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="dropdown-toggle">
                                {selectedType}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleTypeSelect('All')}>All</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleTypeSelect('English')}>English</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleTypeSelect('Hindi')}>Hindi</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleTypeSelect('Animation')}>Animation</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleTypeSelect('Kolkata')}>Kolkata</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            <header className="hero bg-primary text-white text-center py-5">
                <Container>
                    <h1 className="display-4 font-weight-bold">Welcome to Movie Hunt</h1>
                    <p className="lead">Discover and track your favorite movies.</p>
                    <Button variant="light" href="#explore" className="btn-lg btn-outline-light">Explore Now</Button>
                </Container>
            </header>

            <Container className="my-5 movie-list-container">
                <h2 className="text-center mb-4">Popular Movies</h2>
                <Row>
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                            <Col xs={12} sm={6} md={4} lg={3} className="mb-4" key={movie.id}>
                                <Card className="movie-card">
                                    <Card.Img variant="top" src={movie.posterUrl || "https://m.media-amazon.com/images/I/71BokibfVUL._AC_SL1500_.jpg"} alt={movie.title} className="card-img-top" />
                                    <Card.Body>
                                        <Card.Title className="font-weight-bold">{movie.title}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{movie.year}</Card.Subtitle>
                                        <Card.Text>
                                            <strong>Resolution:</strong> {movie.resolution}<br />
                                            <strong>Type:</strong> {movie.type}
                                        </Card.Text>
                                        <Button 
                                            variant="primary" 
                                            href={movie.url ? `${movie.category}/${movie.year}/${movie.url}` : "#"}
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="d-flex align-items-center"
                                        >
                                            <FaPlay className="mr-2" /> Watch
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col xs={12}>
                            <p className="text-center">No movies found</p>
                        </Col>
                    )}
                </Row>
            </Container>

            <footer className="bg-dark text-white text-center py-3">
                <Container>
                    <p>&copy; 2024 Movie Hunt. All Rights Reserved.</p>
                    <p>
                        <a href="#privacy-policy" className="text-white">Privacy Policy</a> | 
                        <a href="#terms-of-service" className="text-white"> Terms of Service</a>
                    </p>
                </Container>
            </footer>
        </div>
    );
};

export default App;

// src/handle_api/movie.js

import axios from 'axios';

export async function fetchMovieList() {
    try {
        const response = await axios.get('http://localhost:3000/api/movielist'); // Your API endpoint

        // Return the data from the response
        return response.data;
    } catch (error) {
        console.error('Error fetching movie list:', error);
        // Handle the error as needed, for example by returning an empty array or null
        return null;
    }
}

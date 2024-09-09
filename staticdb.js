import fs from 'fs';
import path from 'path';

import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

/**
 * Function to retrieve movies data for a specific year from JSON files in a directory
 * based on a file name that includes the specified type.
 * @param {number} year - The year to retrieve data for
 * @param {string} type - The type to match against file names
 * @returns {object[]} - Array of movies for the specified year
 */
export const getMoviesByYear = (year, type) => {
    try {
        // Directory containing the JSON files
        const directoryPath = path.resolve('update'); // Ensure the path is resolved correctly

        // Synchronously read all files in the directory
        const files = fs.readdirSync(directoryPath);

        // Find the matching file based on the type
        const matchingFile = files.find(file => 
            file.endsWith('.json') && file.toLowerCase().includes(type.toLowerCase())
        );

        if (matchingFile) {
            const filePath = path.join(directoryPath, matchingFile); // Construct the full file path

            // Read the JSON file synchronously
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(fileData);

            // Get the array of movies for the specified year
            const moviesForYear = data[year] || [];

            return moviesForYear;
        } else {
            console.warn('No matching file found for type:', type);
            return [];
        }
    } catch (error) {
        console.error('Error loading JSON files:', error);
        return []; // Return an empty array on error
    }
};


export const getmovieFile = async (category, year, title) => {
    try {
        // Directory containing the JSON files
        const directoryPath = path.resolve('update'); // Ensure the path is resolved correctly

        // Synchronously read all files in the directory
        const files = fs.readdirSync(directoryPath);

        // Find the matching file based on the category
        const matchingFile = files.find(file => 
            file.endsWith('.json') && file.toLowerCase().includes(category.toLowerCase())
        );

        if (matchingFile) {
            const filePath = path.join(directoryPath, matchingFile); // Construct the full file path

            // Read the JSON file synchronously
            const fileData = fs.readFileSync(filePath, 'utf-8');
            const data = JSON.parse(fileData);

            // Find the movie for the specified year and title
            const moviesForYear = data[year] || [];
            const movie = moviesForYear.find(movie => movie.url.toLowerCase() === title.toLowerCase());

            if (movie) {

             const file =   await fetchmovieFile(movie.link);
// Example usage
                const firstSegment = getBaseUrl(movie.link);  
                movie.link = `${firstSegment}/${file[0].link}`;

                return movie; // Return the single movie data
            } else {
                console.warn('Movie with the specified title not found for year:', year);
                return null; // Return null if no movie matches
            }
        } else {
            console.warn('No matching file found for category:', category);
            return null; // Return null if no matching file is found
        }
    } catch (error) {
        console.error('Error loading JSON files:', error);
        return null; // Return null on error
    }
};





async function fetchmovieFile(url) {
    try {
        // Fetch HTML content from the remote server
        const response = await fetch(url);

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the HTML content
        const data = await response.text();
        // Parse the HTML with JSDOM
        const dom = new JSDOM(data);
        const document = dom.window.document;

        // Initialize an empty array to store the results
        let links = [];

        // Select all 'tr' elements in the document
        let rows = document.querySelectorAll('tr');

        // Iterate over each 'tr' element
        rows.forEach(row => {
            // Find the 'img' tag within 'td.fb-i' of this row
            const imgElement = row.querySelector('td.fb-i img');
            
            // Check if the 'img' tag exists and its 'alt' attribute is 'folder'
            if (imgElement && imgElement.alt === 'file') {
                // Find the 'a' tag within 'td.fb-n' of this row
                const linkElement = row.querySelector('td.fb-n a');
                
                if (linkElement) {
                    // Extract the 'href' attribute and inner HTML
                    const link = linkElement.href;                    
                    // Store the result
                    links.push({link:link});
                }
            }
        });

        return links;

    } catch (error) {
        console.error(`Error fetching movie list for :`, error);
        return [];
    }
}




function getBaseUrl(fullUrl) {
    try {
        // Create a URL object
        const urlObj = new URL(fullUrl);

        // Construct the base URL from protocol and host
        const baseUrl = `${urlObj.protocol}//${urlObj.host}`;

        return baseUrl;
    } catch (error) {
        console.error('Error extracting base URL:', error);
        return null;
    }
}
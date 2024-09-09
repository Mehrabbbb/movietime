import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './player.css'; // Import custom styles
import { fetchWatchToken } from './handle_api/watch'; // Import the function
import { FaPlay, FaPause, FaForward, FaVolumeUp, FaVolumeDown } from 'react-icons/fa'; // Import icons

const MoviePage = () => {
    // Extract parameters from the URL
    const { category, year, title } = useParams();
    const videoRef = useRef(null);
    const [videoSrc, setVideoSrc] = useState('');
    
    const playPauseVideo = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    const forwardVideo = () => {
        if (videoRef.current) {
            videoRef.current.currentTime += 10;
        }
    };

    const increaseVolume = () => {
        if (videoRef.current) {
            videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1);
        }
    };

    const decreaseVolume = () => {
        if (videoRef.current) {
            videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0);
        }
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                rewindVideo(); // Implement rewindVideo if needed
                break;
            case 'ArrowRight':
                forwardVideo();
                break;
            case 'ArrowUp':
                increaseVolume();
                break;
            case 'ArrowDown':
                decreaseVolume();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        // Construct the parameter string or URL based on extracted params
        const fetchVideoSrc = async () => {
            try {
                // Construct the request or API call using parameters
                const response = await fetchWatchToken(category, year, title );
                console.log(response.link)
                if (response && response.link) {
                    setVideoSrc(response.link);
                }
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchVideoSrc();

        // Add event listener for keydown events
        document.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [category, year, title]);

    return (
        <div className="page-background">
            <div className="container">
                <div className="video-container">
                    <video ref={videoRef} className="w-100" controls>
                        {videoSrc && <source src={videoSrc} type="video/mp4" />}
                        Your browser does not support the video tag.
                    </video>
                    <div className="controls text-center mt-2">
                        <button className="btn btn-custom" onClick={playPauseVideo}>
                            {videoRef.current && videoRef.current.paused ? <FaPlay /> : <FaPause />}
                        </button>
                        <button className="btn btn-custom" onClick={forwardVideo}>
                            <FaForward />
                        </button>
                        <button className="btn btn-custom" onClick={increaseVolume}>
                            <FaVolumeUp />
                        </button>
                        <button className="btn btn-custom" onClick={decreaseVolume}>
                            <FaVolumeDown />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviePage;

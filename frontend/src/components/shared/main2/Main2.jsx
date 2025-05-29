import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import './Main2.css';

const Main2 = () => {
    const [query, setQuery] = useState("");
    const [counters, setCounters] = useState({
        jobs: 0,
        companies: 0,
        candidates: 0
    });
    const [hasAnimated, setHasAnimated] = useState(false);
    const componentRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        if (!query.trim()) {
            alert("Please enter a search term.");
            return;
        }
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchJobHandler();
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    setHasAnimated(true);
                    observer.unobserve(componentRef.current);
                }
            },
            { threshold: 0.5 }
        );

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, [hasAnimated]);

    const animateCounters = () => {
        const duration = 3000;
        const startTime = performance.now();
        const targetValues = {
            jobs: 1000,
            companies: 100,
            candidates: 10000
        };

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            setCounters({
                jobs: Math.floor(progress * targetValues.jobs),
                companies: Math.floor(progress * targetValues.companies),
                candidates: Math.floor(progress * targetValues.candidates)
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCounters(targetValues);
            }
        };

        requestAnimationFrame(animate);
    };

    return (
        <div className='main2-container' ref={componentRef}>
            <div className='main2-content'>
                <span className='main2-badge'>No. 1 Job Hunt Website</span>
                <h1 className='main2-title'>Search, Apply & <br /> Get Your <span className='main2-title-accent'>Dream Jobs</span></h1>
                <p className='main2-subtitle'>Find your perfect career match with our advanced job search technology and personalized recommendations.</p>
                <div className='main2-search-container'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='main2-search-input'
                    />
                    <button onClick={searchJobHandler} className="main2-search-button">
                        <Search className='main2-search-icon' />
                    </button>
                </div>
                <div className='main2-stats'>
                    <div className='main2-stat-item'>
                        <span className='main2-stat-number'>{counters.jobs.toLocaleString()}</span>
                        <span className='main2-stat-label'>Jobs Posted</span>
                    </div>
                    <div className='main2-stat-item'>
                        <span className='main2-stat-number'>{counters.companies.toLocaleString()}</span>
                        <span className='main2-stat-label'>Companies</span>
                    </div>
                    <div className='main2-stat-item'>
                        <span className='main2-stat-number'>{counters.candidates.toLocaleString()}</span>
                        <span className='main2-stat-label'>Candidates</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main2;

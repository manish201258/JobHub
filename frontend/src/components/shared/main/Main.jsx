import React, { useEffect, useState } from 'react';
import './Main.css';

const Main = () => {
  const images = [
    'https://img.freepik.com/free-photo/job-search-concept-find-your-career-online-website_169016-39355.jpg?ga=GA1.1.2093813867.1733464151&semt=ais_hybrid',
    'https://img.freepik.com/free-photo/rear-view-adult-man-searching-new-job-working-writing-his-resume-laptop_662251-2153.jpg?ga=GA1.1.2093813867.1733464151&semt=ais_hybrid',
    'https://cdn.pixabay.com/photo/2015/06/10/07/03/building-804526_640.jpg',
    'https://media.istockphoto.com/id/1062143482/photo/random-career-path-opportunities-concept-by-colorful-wooden-alphabets-building-word-career.webp?a=1&b=1&s=612x612&w=0&k=20&c=4w0DnbugE8f0UfmcYFKJ23_ey25ZjCww_Jj8IA11h_g='
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider" style={{position:'relative'}}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}
      <div className="overlay1" style={{position:'absolute',top:'50%'}}>
      <h1 className=' text-7xl font-bold' style={{fontSize:'7rem'}}>Job<span className='text-lime-500'>Hub</span></h1>
        <p className='text-5xl font-bold text-lime-500' style={{fontSize:'1.7rem'}}>Your One Stop Solution for Job Searching.</p>
      </div>
    </div>
  );
};

export default Main;

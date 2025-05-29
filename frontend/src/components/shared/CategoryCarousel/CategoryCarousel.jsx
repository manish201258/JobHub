import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '../../ui/CustomCarousel';
import './CategoryCarousel.css';

const categories = [
    "Software Developer",
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer",
    "UX/UI Designer",
    "DevOps Engineer",
    "Mobile Developer",
    "ML Engineer",
    "Product Manager"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="category-carousel-container">
            <h2 className="category-carousel-title">Popular Job Categories</h2>

            <Carousel
                opts={{
                    align: "start",
                    slidesToScroll: 'auto',
                    containScroll: "trimSnaps"
                }}
                className="w-full max-w-[90vw] md:max-w-[1200px] mx-auto relative"
            >
                {/* 🚀 Fixed: Buttons inside Carousel to avoid errors */}
                <CarouselPrevious className="carousel-button carousel-prev" />
                <CarouselNext className="carousel-button carousel-next" />

                <CarouselContent className="-ml-1">
                    {categories.map((category, index) => (
                        <CarouselItem key={index} className="pl-1 basis-auto">
                            <button
                                onClick={() => searchJobHandler(category)}
                                className="category-button"
                            >
                                {category}
                            </button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;

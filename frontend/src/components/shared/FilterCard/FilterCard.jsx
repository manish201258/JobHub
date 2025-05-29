import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Label } from '../../ui/label';

import { setSearchedQuery } from '@/redux/jobSlice';
import './FilterCard.css';
import { useDispatch } from 'react-redux';




const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai", "Jaipur", "Mohali", "Lucknow", "Ahmedabad", "Chennai", "Remote"]
    },
    {
        filterType: "Industry",
        array: ["Software Developer", "Software Engineer", "Data Scientist", "Data Analytics", "Frontend Developer", "Mern Stack Developer", "Backend Developer", "FullStack Developer", "DevOps Engineer", "App Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-3LPA", "4-6LPA", "6-10LPA", "10-20LPA", "20-40LPA", "40+LPA"]
    },
    {
        filterType: "Experience",
        array: ["0-2 Years", "2-4 Years", "5-10 Years", "10+ Years"]
    },
    {
        filterType: "Work Type",
        array: ["Full Time", "Part Time"]
    }
];


const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [activeFilter, setActiveFilter] = useState(null);
    const dispatch = useDispatch();

    

    
    // Handle filter selection
    const changeHandler = (filterType, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filterType]: value === "None" ? undefined : value // Remove filter if "None" is selected
        }));
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedFilters));
    }, [selectedFilters, dispatch]);

    const toggleFilterSection = (filterType) => {
        setActiveFilter(activeFilter === filterType ? null : filterType);
    };

    return (
        <motion.div 
            className="filter-panel-container"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.h1 
                className="filter-panel-title"
                whileHover={{ x: 5 }}
            >
                Filter Jobs
            </motion.h1>
            <motion.div className="filter-divider"></motion.div>

            {filterData.map((data, index) => (
                <div key={`filter-${index}`} className="filter-section">
                    <motion.div 
                        className="filter-section-header"
                        onClick={() => toggleFilterSection(data.filterType)}
                        whileHover={{ backgroundColor: 'rgba(57, 255, 20, 0.1)' }}
                    >
                        <h2 className="filter-type-title">{data.filterType}</h2>
                        <motion.div
                            animate={{ rotate: activeFilter === data.filterType ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            ▼
                        </motion.div>
                    </motion.div>

                    <AnimatePresence>
                        {activeFilter === data.filterType && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="filter-options-container"
                            >
                                <RadioGroup 
                                    value={selectedFilters[data.filterType] || ''} 
                                    onValueChange={(value) => changeHandler(data.filterType, value)}
                                >
                                    {data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <motion.div 
                                                key={itemId}
                                                className="filter-option"
                                                whileHover={{ x: 5 }}
                                            >
                                                <RadioGroupItem 
                                                    value={item} 
                                                    id={itemId} 
                                                    className="filter-radio"
                                                />
                                                <Label htmlFor={itemId} className="filter-label">
                                                    {item}
                                                </Label>
                                            </motion.div>
                                        );
                                    })}
                                </RadioGroup>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}

            <div className="filter-glow-effect"></div>
        </motion.div>
    );
};

export default FilterCard;

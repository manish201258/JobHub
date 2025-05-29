import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import Navbar from '../../components/shared/navbar/Navbar';
import FilterCard from '../../components/shared/FilterCard/FilterCard';
import Job from '../../components/shared/Job/Job';
import './Jobs.css';
import Footer from '../../components/shared/footer/Footer';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);


    const matchSalary = (jobSalary, filterSalary) => {
        if (!jobSalary || !filterSalary) return false;

        const salaryStr = typeof jobSalary === 'string' ? jobSalary : String(jobSalary);
        const salary = parseFloat(salaryStr.replace("LPA", "").trim());

        switch (filterSalary) {
            case "0-3LPA": return salary >= 0 && salary <= 3;
            case "4-6LPA": return salary > 3 && salary <= 6;
            case "6-10LPA": return salary > 6 && salary <= 10;
            case "10-20LPA": return salary > 10 && salary <= 20;
            case "20-40LPA": return salary > 20 && salary <= 40;
            case "40+LPA": return salary > 40;
            default: return false;
        }
    };

    const matchExperience = (jobExperience, filterExperience) => {
        if (!jobExperience || !filterExperience) return false;

        const experienceStr = typeof jobExperience === 'string' ? jobExperience : String(jobExperience);
        const match = experienceStr.match(/\d+/);
        const experience = match ? parseInt(match[0], 10) : null;

        if (experience === null) return false;

        switch (filterExperience) {
            case "0-2 Years": return experience >= 0 && experience <= 2;
            case "2-4 Years": return experience > 2 && experience <= 4;
            case "5-10 Years": return experience > 5 && experience <= 10;
            case "10+ Years": return experience > 10;
            default: return false;
        }
    };

    const matchWorkType = (jobType, filterType) => {
            
        if (!jobType || !filterType) 
            return false;
        return jobType.toLowerCase().trim() === filterType.toLowerCase().trim();
    };
    
    useEffect(() => {
        if (searchedQuery && typeof searchedQuery === 'object') {
            const filteredJobs = allJobs.filter((job) => {
                return Object.keys(searchedQuery).every((filterType) => {
                    if (filterType === "Salary") {
                        return matchSalary(job.salary, searchedQuery[filterType]);
                    }
                    if (filterType === "Experience") {
                        return matchExperience(job.experienceLevel, searchedQuery[filterType]);
                    }
                    if (filterType === "Work Type") {
                        return matchWorkType(job.jobType, searchedQuery[filterType]);
                    }
                    if (filterType === "Location") {
                        return job.location?.toLowerCase().trim() === searchedQuery[filterType].toLowerCase().trim();
                    }
                    if (filterType === "Industry") {
                        return job.title?.toLowerCase().includes(searchedQuery[filterType].toLowerCase().trim());
                    }
                    
                    return job[filterType]?.toLowerCase().includes(searchedQuery[filterType].toLowerCase());
                });
            });
    
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);
    
    
    return (
        <div className="jobs-page-container">
            <Navbar />
            <motion.div 
                className="jobs-content-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="jobs-layout-grid">
                    <motion.div 
                        className="jobs-filter-section"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <FilterCard />
                    </motion.div>

                    <div className="jobs-list-section">
                        <AnimatePresence>
                            {filterJobs.length <= 0 ? (
                                <motion.div
                                    className="jobs-empty-state"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                >
                                    <h3>No jobs found</h3>
                                    <p>Try adjusting your search criteria</p>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    className="jobs-grid-wrapper"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ staggerChildren: 0.1 }}
                                >
                                    <div className="jobs-grid-container">
                                        {filterJobs.map((job) => (
                                            <motion.div
                                                key={job?._id}
                                                className="job-card-wrapper"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: -20, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default Jobs;

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Navbar from '../../components/shared/navbar/Navbar';
import Job from '../../components/shared/Job/Job';
import './Browse.css';
import Footer from '@/components/shared/footer/Footer';

const Browse = () => {
    useGetAllJobs();
    const dispatch = useDispatch();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        console.log("Filtering Jobs with Query:", searchedQuery);
        console.log("All Jobs Before Filtering:", allJobs);

        const query = typeof searchedQuery === "string" ? searchedQuery.trim().toLowerCase() : "";


        if (!allJobs || allJobs.length === 0) {
            console.log("No jobs available to filter");
            return;
        }

        if (query) {
            const filtered = allJobs.filter(job =>
                job.title?.toLowerCase().includes(query)
            );
            console.log("Filtered Jobs:", filtered);
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs(allJobs);
        }
    }, [searchedQuery, allJobs]);

    return (
        <div className="browse-page-container">
            <Navbar />
            <motion.div 
                className="browse-content-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="browse-header"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1 className="browse-title">
                        Search Results <span className="job-count-badge">{filteredJobs.length}</span>
                    </h1>
                </motion.div>

                <motion.div className="jobs-grid-container">
                    <AnimatePresence>
                        {filteredJobs.length === 0 ? (
                            <motion.div className="empty-state">
                                <h3>No jobs found for "{typeof searchedQuery === 'object' ? JSON.stringify(searchedQuery) : searchedQuery}"</h3>

                                <p>Try a different search term.</p>
                            </motion.div>
                        ) : (
                            filteredJobs.map((job) => (
                                <motion.div key={job._id} className='job-card-wrapper'>
                                    <Job job={job} />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
            <Footer />
        </div>
    );
};

export default Browse;

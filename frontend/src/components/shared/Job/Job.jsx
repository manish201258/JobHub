import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Job.css';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    };
    return (
        <motion.div 
        className="job-card-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
    >
            <div className="job-card-header">
                <span className="job-posted-time">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </span>
                <motion.button 
                    className="job-bookmark-btn"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Bookmark className="bookmark-icon" />
                </motion.button>
            </div>

            <div className="job-company-info">
                <motion.div 
                    className="company-logo-wrapper"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                >
                    <img 
                        src={job?.company?.logo} 
                        alt={job?.company?.name} 
                        className="company-logo"
                    />
                </motion.div>
                <div className="company-details">
                    <h2 className="company-name">{job?.company?.name}</h2>
                    <p className="company-location">{job?.location}</p>
                </div>
            </div>

            <div className="job-details">
                <h1 className="job-title">{job?.title}</h1>
                <p className="job-description">{job?.description}</p>
            </div>

            <div className="job-tags">
                <span className="job-tag positions-tag">{job?.position} Positions</span>
                <span className="job-tag type-tag">{job?.jobType}</span>
                <span className="job-tag salary-tag">{job?.salary}LPA</span>
            </div>

            <div className="job-actions">
                <motion.button 
                    className="details-btn"
                    onClick={() => navigate(`/description/${job?._id}`)}
                    whileHover={{ x: 5 }}
                >
                    Details
                </motion.button>
                <motion.button 
                    className="save-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Save For Later
                </motion.button>
            </div>

            <div className="job-card-glow"></div>
        </motion.div>
    );
};

export default Job;
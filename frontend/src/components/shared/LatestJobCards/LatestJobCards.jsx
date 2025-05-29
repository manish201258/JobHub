import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LatestJobCards.css';
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div className="job-card" onClick={() => navigate(`/description/${job._id}`)}>
            <div className="card-header">
                <div className="company-info">
                {
                    job.company.logo ? (
                        <motion.div 
                        className="company-logo-wrapper"
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.5 }}
                        >
                        <img src={job.company.logo} alt="" /> 
                        </motion.div>
                    ) : (
                        <div className="company-logo">{job.company.name.charAt(0)}</div>
                    )
                    }

                    <div>
                        <h3 className="company-name">{job.company.name}</h3>
                        <p className="company-location">{job.location || 'India'}</p>
                    </div>
                </div>
                <span className="hiring-badge">HIRING</span>
            </div>

            <div className="card-body">
                <h2 className="job-title">{job.title}</h2>
                <p className="job-description">{job.description.substring(0, 80)}...</p>
                
                <div className="job-meta">
                    <div className="meta-item">
                        <span className="meta-label">POSITIONS</span>
                        <span className="meta-value">{job.position}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">TYPE</span>
                        <span className="meta-value">{job.jobType}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">SALARY</span>
                        <span className="meta-value highlight">{job.salary} LPA</span>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <button className="apply-btn">Quick Apply</button>
            </div>
        </div>
    );
};

export default LatestJobCards;
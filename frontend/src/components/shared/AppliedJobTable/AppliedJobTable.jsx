import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import './AppliedJobTable.css';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    const statusColors = {
        rejected: '#ff4d4f',
        pending: '#faad14',
        accepted: '#52c41a',
        interviewing: '#1890ff'
    };

    return (
        <motion.div 
            className="applied-jobs-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div 
                className="jobs-table-wrapper"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h3 className="table-caption"></h3>
                
                <div className="table-header">
                    <div className="header-cell">Date</div>
                    <div className="header-cell">Job Role</div>
                    <div className="header-cell">Company</div>
                    <div className="header-cell text-right">Status</div>
                </div>

                <AnimatePresence>
                    {allAppliedJobs.length <= 0 ? (
                        <motion.div
                            className="empty-state"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            You haven't applied to any jobs yet.
                        </motion.div>
                    ) : (
                        <div className="table-body">
                            {allAppliedJobs.map((appliedJob) => (
                                <motion.div
                                    key={appliedJob._id}
                                    className="table-row"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ 
                                        y: -2,
                                        boxShadow: "0 5px 15px rgba(57, 255, 20, 0.1)"
                                    }}
                                >
                                    <div className="table-cell">
                                        {appliedJob?.createdAt?.split("T")[0]}
                                    </div>
                                    <div className="table-cell">
                                        {appliedJob.job?.title}
                                    </div>
                                    <div className="table-cell">
                                        {appliedJob.job?.company?.name}
                                    </div>
                                    <div className="table-cell text-right">
                                        <motion.span 
                                            className="status-badge"
                                            style={{ 
                                                backgroundColor: statusColors[appliedJob.status] || '#d9d9d9',
                                                color: '#fff'
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {appliedJob.status.toUpperCase()}
                                        </motion.span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default AppliedJobTable;
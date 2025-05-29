import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../shared/navbar/Navbar';
import ApplicantsTable from '../ApplicantsTable/ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../../redux/applicationSlice.js';
import { FaUsers, FaUserTie } from 'react-icons/fa';
import './Applicants.css';
import styled from 'styled-components';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { 
                    withCredentials: true 
                });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    return (
        <div className="applicants-container">
            <Navbar />
            <motion.div 
                className="applicants-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="applicants-card"
                    initial={{ rotateX: -5, rotateY: -2 }}
                    animate={{ rotateX: 0, rotateY: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ 
                        boxShadow: "0 15px 30px rgba(0, 255, 0, 0.1)"
                    }}
                >
                    <motion.div 
                        className="applicants-header"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.div 
                            className="applicants-title-container"
                            whileHover={{ scale: 1.02 }}
                        >
                            <FaUserTie className="applicants-title-icon" />
                            <h1 className="applicants-title">
                                Job Applicants
                                <motion.span 
                                    className="applicants-count application-counter"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 }
                                }
                                >
                                    {applicants?.applications?.length || 0}
                                </motion.span>
                            </h1>
                        </motion.div>
                        <motion.p 
                            className="applicants-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            Review and manage all applicants for this position
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        className="applicants-table-container"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <ApplicantsTable />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Applicants;
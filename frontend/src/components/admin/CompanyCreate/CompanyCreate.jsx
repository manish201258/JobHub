import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../../redux/companySlice';
import Navbar from '../../shared/navbar/Navbar';
import './CompanyCreate.css';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Please enter a company name');
            return;
        }

        try {
            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`, 
                { companyName }, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company._id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to create company');
        }
    };

    return (
        <div className="company-create-container">
            <Navbar />
            <motion.div 
                className="company-create-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="company-create-card"
                    initial={{ rotateX: -5, rotateY: -2 }}
                    animate={{ rotateX: 0, rotateY: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ 
                        boxShadow: "0 15px 30px rgba(0, 255, 0, 0.1)"
                    }}
                >
                    <motion.div 
                        className="company-create-header"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.h1 
                            className="company-create-title"
                            whileHover={{ scale: 1.02 }}
                        >
                            Create New Company
                        </motion.h1>
                        <motion.p 
                            className="company-create-subtitle"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            What would you like to name your company? You can change this later.
                        </motion.p>
                    </motion.div>

                    <motion.div 
                        className="company-create-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Label className="company-create-label">Company Name</Label>
                        <Input
                            type="text"
                            className="company-create-input"
                            placeholder="JobHunt, Microsoft etc."
                            onChange={(e) => setCompanyName(e.target.value)}
                            value={companyName}
                        />
                        
                        <motion.div 
                            className="company-create-actions"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <motion.button
                                className="company-create-cancel-btn"
                                whileHover={{ 
                                    scale: 1.05,
                                    borderColor: '#00ff00'
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/admin/companies")}
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                className="company-create-submit-btn"
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={registerNewCompany}
                            >
                                Continue
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CompanyCreate;
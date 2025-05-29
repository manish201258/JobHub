import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPlus, FaBuilding } from 'react-icons/fa';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import CompaniesTable from '../../components/admin/CompaniesTable/CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import './AdminCompanies.css';
import Navbar from '@/components/shared/navbar/Navbar';

const AdminCompanies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="admin-companies-container">
            <Navbar/>
            <motion.div 
                className="admin-companies-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header Section */}
                <motion.div 
                    className="admin-companies-header"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div 
                        className="admin-companies-title-container"
                        whileHover={{ scale: 1.02 }}
                    >
                        <FaBuilding className="admin-companies-title-icon" />
                        <h1 className="admin-companies-title">Company Management</h1>
                    </motion.div>
                    
                    <motion.div 
                        className="admin-companies-actions"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div 
                            className="admin-companies-search"
                            whileHover={{ scale: 1.01 }}
                        >
                            <FaSearch className="admin-companies-search-icon" />
                            <Input
                                className="admin-companies-search-input"
                                placeholder="Filter by name..."
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </motion.div>
                        
                        <motion.button
                            className="admin-companies-new-btn"
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/admin/companies/create")}
                        >
                            <FaPlus className="admin-companies-new-icon" />
                            New Company
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Table Section */}
                <motion.div 
                    className="admin-companies-table-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <CompaniesTable />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default AdminCompanies;
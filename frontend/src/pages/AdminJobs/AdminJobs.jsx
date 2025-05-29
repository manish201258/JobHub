import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from '../../components/admin/AdminJobsTable/AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import Navbar from '../../components/shared/navbar/Navbar';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './AdminJobs.css';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div className="admin-jobs-container">
      <Navbar />
      <motion.div 
        className="admin-jobs-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="admin-jobs-card"
          initial={{ rotateX: -5, rotateY: -2 }}
          animate={{ rotateX: 0, rotateY: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ 
            boxShadow: "0 15px 30px rgba(0, 255, 0, 0.1)"
          }}
        >
          {/* Header Section */}
          <motion.div 
            className="admin-jobs-header"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1 
              className="admin-jobs-title"
              whileHover={{ scale: 1.02 }}
            >
              Job Management
            </motion.h1>
            
            <motion.div 
              className="admin-jobs-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div 
                className="admin-jobs-search"
                whileHover={{ scale: 1.01 }}
              >
                <FaSearch className="admin-jobs-search-icon" />
                <Input
                  className="admin-jobs-search-input"
                  placeholder="Filter by name, role..."
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                />
              </motion.div>
              
              <motion.button
                className="admin-jobs-new-btn"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/admin/jobs/create")}
              >
                <FaPlus className="admin-jobs-new-icon" />
                New Job
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Table Section */}
          <motion.div 
            className="admin-jobs-table-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <AdminJobsTable />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminJobs;
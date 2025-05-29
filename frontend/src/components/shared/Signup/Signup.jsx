import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import './Signup.css';
import axios from 'axios';
import { USER_API_END_POINT } from '@/components/utils/constant';

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader } from 'lucide-react'
import { Input } from 'postcss';


const Signup = ({ onClose }) => {
    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        profilePhoto: ''
    });
  const {loading,user}=useSelector(store=>store.auth);
    const handleChange = (e) => {
       setInput({...input,[e.target.name]:e.target.value});
    };

    const handleFileChange = (e) => {
       setInput({...input,profilePhoto:e.target.files?.[0]});
    };

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("fullname", input.fullname);
        formdata.append("email", input.email);
        formdata.append("phoneNumber", input.phoneNumber);
        formdata.append("password", input.password);
        formdata.append("role", input.role);
        if (input.profilePhoto) {
          formdata.append("file", input.profilePhoto);
        }
      
        for (let pair of formdata.entries()) {
            console.log(pair[0], pair[1]); // Check if the file is being added properly
          }

          
      
        try {
          // API Call
           dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/signup`, formdata, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
            timeout: 5000,
          });
      
          if (res.data.success) {
            console.log("✅ Success Toast Triggered:", res.data.message);
            toast.success(res.data.message);
      
            // ✅ Store user in localStorage
            localStorage.setItem("user", JSON.stringify(res.data.user));
      
            // ✅ Redirect to Home and refresh Navbar
            setTimeout(() => {
              navigate("/login");
              window.location.reload(); // Forces Navbar update
            }, 2000);
          }
        } catch (error) {
          console.error("❌ API Request Failed:", error);
          console.log("❌ Error Message:", error.message);
          console.log("❌ API Response:", error.response?.data || "No response from API");
      
          toast.error(error.response?.data?.message || "Registration failed.");
        }
        finally{
            dispatch(setLoading(false));
        }
      };

    return (
        <motion.div 
            className="tech-signup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div 
                className="tech-signup-container"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
            >
                <div className="tech-signup-header">
                    <h1 className="tech-signup-title">CREATE ACCOUNT</h1>
                    <motion.button 
                        className="tech-signup-close"
                        onClick={onClose}
                        whileHover={{ rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        ×
                    </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="tech-signup-form">
                    <div className="tech-input-group">
                        <input
                            type="text"
                            name="fullname"
                            value={input.fullname}
                            onChange={handleChange}
                            className="tech-input-field"
                            placeholder=" "
                            required
                        />
                        <label className="tech-input-label">Full Name</label>
                        <div className="tech-input-highlight"></div>
                    </div>

                    <div className="tech-input-group">
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={handleChange}
                            className="tech-input-field"
                            placeholder=" "
                            required
                        />
                        <label className="tech-input-label">Email</label>
                        <div className="tech-input-highlight"></div>
                    </div>

                    <div className="tech-input-group">
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={input.phoneNumber}
                            onChange={handleChange}
                            className="tech-input-field"
                            placeholder=" "
                            required
                        />
                        <label className="tech-input-label">Phone Number</label>
                        <div className="tech-input-highlight"></div>
                    </div>

                    <div className="tech-input-group">
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={handleChange}
                            className="tech-input-field"
                            placeholder=" "
                            required
                        />
                        <label className="tech-input-label">Password</label>
                        <div className="tech-input-highlight"></div>
                    </div>

                    <div className="tech-role-selector">
                        <div className="tech-role-options">
                            <button
                                type="button"
                                className={`tech-role-option ${input.role === 'student' ? 'active' : ''}`}
                                onClick={() => setInput({...input, role: 'student'})}
                            >
                                Job Seeker
                            </button>
                            <button
                                type="button"
                                className={`tech-role-option ${input.role === 'recruiter' ? 'active' : ''}`}
                                onClick={() => setInput({...input, role: 'recruiter'})}
                            >
                                Employer
                            </button>
                        </div>
                    </div>

                    <div className="tech-file-upload">
                        <label className="tech-file-label">
                            <span>Profile Photo</span>
                            <div className="tech-file-input-wrapper">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="tech-file-input"
                                />
                                <div className="tech-file-display">
                                    { input.profilePhoto? input.profilePhoto.name:"Choose file"}
                                </div>
                            </div>
                        </label>
                    </div>

                    <motion.button 
                        type="submit" 
                        className="tech-submit-button"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="tech-spinner" />
                        ) : (
                            'REGISTER'
                        )}
                    </motion.button>

                    <div className="tech-login-prompt">
                        Already have an account?{' '}
                        <Link to="/login" className="tech-login-link">
                            Login
                        </Link>
                    </div>
                </form>

                <div className="tech-decoration">
                    <div className="tech-grid-pattern"></div>
                    <div className="tech-neon-glow"></div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Signup;
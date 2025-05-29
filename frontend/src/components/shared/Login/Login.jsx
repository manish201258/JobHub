import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import './Login.css';
import axios from 'axios';
import { USER_API_END_POINT } from '@/components/utils/constant';

const Login = ({ onClose }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'student'
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    const { loading } = useSelector(store => store.auth);
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
    
            // Verify response structure
            if (!res.data || !res.data.token) {
                throw new Error('Invalid response from server');
            }
    
            // Store token securely
            localStorage.setItem('token', res.data.token);
            dispatch(setUser(res.data.user));
            
            toast.success(`${res.data.user.fullname}, You Logged in successfully`);
            // localStorage.setItem("user role",res.data.user.role);
             navigate('/')
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.response?.data?.message || "Login failed!");
        } finally {
            dispatch(setLoading(false));
        }
    };
  
    
    
    return (
        <motion.div 
            className="auth-login-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div 
                className="auth-login-container"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                <div className="auth-login-header">
                    <motion.h2 
                        className="auth-login-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        WELCOME BACK
                    </motion.h2>
                    <motion.button 
                        className="auth-login-close"
                        onClick={onClose}
                        whileHover={{ rotate: 90, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        &times;
                    </motion.button>
                </div>

                <motion.form 
                    onSubmit={handleSubmit}
                    className="auth-login-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.div 
                        className="auth-input-group"
                        whileHover={{ scale: 1.02 }}
                    >
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="auth-input-field"
                            placeholder=" "
                            required
                        />
                        <label className="auth-input-label">Email</label>
                        <div className="auth-input-highlight"></div>
                    </motion.div>

                    <motion.div 
                        className="auth-input-group"
                        whileHover={{ scale: 1.02 }}
                    >
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="auth-input-field"
                            placeholder=" "
                            required
                        />
                        <label className="auth-input-label">Password</label>
                        <div className="auth-input-highlight"></div>
                    </motion.div>

                    <div className="auth-role-selector">
                        <label className="auth-role-label">Login As</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="auth-role-select"
                        >
                            <option className='option-login' value="student">Job Seeker</option>
                            <option className='option-login' value="recruiter">Employer</option>
                        </select>
                    </div>

                    <div className="auth-options-row">
                        <label className="auth-remember-me">
                            <input type="checkbox" className="auth-remember-checkbox" />
                            <span className="auth-remember-custom"></span>
                            Remember me
                        </label>
                        <Link to="/forgot-password" className="auth-forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    <motion.button 
                        type="submit" 
                        className="auth-submit-button"
                        whileHover={{ y: -2, boxShadow: "0 10px 20px rgba(57, 255, 20, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="auth-spinner" />
                        ) : (
                            'LOGIN'
                        )}
                    </motion.button>

                    <div className="auth-signup-prompt">
                        Already have an account?{' '}
                        <Link to="/signup" className="auth-signup-link">
                            Signup
                        </Link>
                    </div>
                </motion.form>

                <div className="auth-tech-decoration">
                    <div className="auth-circuit-line"></div>
                    <div className="auth-grid-dots"></div>
                    <div className="auth-neon-glow"></div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Login;
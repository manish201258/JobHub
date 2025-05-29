import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { setUser } from '@/redux/authSlice';
import { toast } from 'react-toastify';
import './UpdateProfileDialog.css';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        
        if (input.file) {
            formData.append("file", input.file);
        }
    
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
    
            if (res.data.success) {
                // Store user in Redux and localStorage
                dispatch(setUser(res.data.user));
             //   localStorage.setItem("user", JSON.stringify(res.data.user)); 
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
            console.log(input)
        }
    
        setOpen(false);
        console.log(input)
    };
    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
                className="neon-dialog-content" 
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    maxHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column'
                }}
                aria-describedby="dialog-description"
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="neon-dialog-inner"
                >
                    <DialogHeader className="neon-dialog-header">
                        <DialogTitle className="neon-dialog-title" id="dialog-description">
                            EDIT PROFILE
                        </DialogTitle>
                    </DialogHeader>
                    
                    <div className="neon-form-scrollable-container">
                        <form onSubmit={submitHandler} className="neon-form-container">
                            <div className='neon-form-grid'>
                                {/* Name Field */}
                                <motion.div className='neon-form-field' whileHover={{ scale: 1.02 }}>
                                    <label htmlFor="fullname" className="neon-label">FULL NAME</label>
                                    <input
                                        id="fullname"
                                        className="neon-input"
                                        type="text"
                                        name="fullname"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        required
                                    />
                                </motion.div>
                                
                                {/* Email Field */}
                                <motion.div className='neon-form-field' whileHover={{ scale: 1.02 }}>
                                    <label htmlFor="email" className="neon-label">EMAIL</label>
                                    <input
                                        id="email"
                                        className="neon-input"
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        required
                                    />
                                </motion.div>
                                
                                {/* Phone Number Field */}
                                <motion.div className='neon-form-field' whileHover={{ scale: 1.02 }}>
                                    <label htmlFor="phoneNumber" className="neon-label">PHONE NUMBER</label>
                                    <input
                                        id="phoneNumber"
                                        className="neon-input"
                                        type="tel"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                    />
                                </motion.div>
                                
                                {/* Bio Field */}
                                <motion.div className='neon-form-field' whileHover={{ scale: 1.02 }}>
                                    <label htmlFor="bio" className="neon-label">BIO</label>
                                    <textarea
                                        id="bio"
                                        className="neon-input"
                                        name="bio"
                                        value={input.bio}
                                        onChange={changeEventHandler}
                                        rows="3"
                                    />
                                </motion.div>
                                
                                {/* Skills Field */}
                                <motion.div className='neon-form-field' whileHover={{ scale: 1.02 }}>
                                    <label htmlFor="skills" className="neon-label">SKILLS</label>
                                    <input
                                        id="skills"
                                        className="neon-input"
                                        name="skills"
                                        value={input.skills}
                                        onChange={changeEventHandler}
                                        placeholder="Separate skills with commas"
                                    />
                                </motion.div>
                                
                                {/* Resume Upload */}
                                <motion.div className='neon-form-field' whileHover={{ scale: 1.02 }}>
                                    <label htmlFor="resume" className="neon-label">RESUME</label>
                                    <div className="neon-file-upload">
                                        <input
                                            id="resume"
                                            type="file"
                                            name='file'
                                            className="neon-file-input"
                                            onChange={fileChangeHandler}
                                            accept="application/pdf"
                                        />
                                        <span className="neon-file-upload-label">
                                            {input.file ? input.file.name : 'CHOOSE FILE (PDF/DOC)'}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>
                            
                            <div className="neon-dialog-footer">
                                <button 
                                    type="submit" 
                                    className="neon-button submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="neon-spinner">🌀</span>
                                            UPDATING...
                                        </>
                                    ) : (
                                        'SAVE CHANGES'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;
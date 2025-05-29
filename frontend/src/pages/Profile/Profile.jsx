import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarImage } from '../../components/ui/avatar';
import { Button } from '../../components/ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui//label';
import AppliedJobTable from '../../components/shared/AppliedJobTable/AppliedJobTable';
import UpdateProfileDialog from '../../components/shared/UpdateProfileDialog/UpdateProfileDialog';
import { useDispatch, useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import Navbar from '../../components/shared/navbar/Navbar';
import './Profile.css';
import Footer from '@/components/shared/footer/Footer';
import ResumeViewer from '@/components/shared/ResumeViewer/ResumeViewer';
import axios from 'axios';
import { USER_API_END_POINT } from '@/components/utils/constant';
import { setUser } from '@/redux/authSlice';
const isResume=true;


const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const dispatch=useDispatch();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log(user.profile.profilePhoto)
                const response = await axios.get("http://localhost:8000/api/v1/user/profile", {
                    withCredentials: true, // ✅ Allows cookies to be sent
                });
        
                console.log("Profile Data:", response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error.response?.data || error);
            }
        };
        fetchUserProfile();
    }, [dispatch]);
    return (
        <div className="profile-page-container">
            <Navbar />
            <motion.div
                className="profile-content-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Profile Card */}
                <motion.div 
                    className="profile-card"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ boxShadow: "0 10px 25px rgba(57, 255, 20, 0.1)" }}
                >
                    <div className="profile-header">
                        <div className="profile-info">
                            <motion.div 
                                className="avatar-wrapper"
                                whileHover={{ rotateY: 180 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Avatar className="profile-avatar">
                                    <AvatarImage 
                                        src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                        alt="profile" 
                                    />
                                </Avatar>
                            </motion.div>
                            <div className="profile-details">
                                <h1 className="profile-name">{user?.fullname}</h1>
                                <p className="profile-bio">{user?.profile?.bio || "No bio available"}</p>
                            </div>
                        </div>
                        <motion.button
                            onClick={() => setOpen(true)}
                            className="edit-profile-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Pen className="edit-icon" />
                        </motion.button>
                    </div>

                    <div className="profile-contact-info">
                        <div className="contact-item">
                            <Mail className="contact-icon" />
                            <span>{user?.email || "Not provided"}</span>
                        </div>
                        <div className="contact-item">
                            <Contact className="contact-icon" />
                            <span>{user?.phoneNumber || "Not provided"}</span>
                        </div>
                    </div>

                    <div className="profile-section">
                        <h2 className="section-title">Skills</h2>
                        <div className="skills-container">
                            {user?.profile?.skills?.length > 0 ? (
                                user.profile.skills.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="skill-badge"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <Badge>{item}</Badge>
                                    </motion.div>
                                ))
                            ) : (
                                <span className="no-skills">No skills added</span>
                            )}
                        </div>
                    </div>
                    <div className="profile-section">
                        <Label className="section-title">Resume</Label>
                        {isResume ? (
                            <ResumeViewer 
                                resumeUrl={user?.profile?.resume}
                                fileName={user?.profile?.resumeOriginalName}
                            />
                        ) : (
                            <span className="no-resume">No resume uploaded</span>
                        )}
                    </div>
                </motion.div>

                {/* Applied Jobs Section */}
                <motion.div 
                    className="applied-jobs-section"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="section-title">Applied Jobs</h2>
                    <AppliedJobTable />
                </motion.div>
            </motion.div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Footer/>
        </div>
    );
};

export default Profile
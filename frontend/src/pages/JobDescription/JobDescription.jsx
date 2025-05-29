import React, { useEffect, useState } from 'react'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../../components/utils/constant.js'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import './JobDescription.css'
import Navbar from '@/components/shared/navbar/Navbar'
import Footer from '@/components/shared/footer/Footer'
import { FaBriefcase, FaMapMarkerAlt, FaFileAlt, FaChartLine, FaRupeeSign, FaUserGraduate, FaUsers, FaClock, FaCheckCircle, FaPaperPlane, FaUserFriends, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const [isApplied, setIsApplied] = useState(false)
    const [applicantCount, setApplicantCount] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const params = useParams()
    const jobId = params.id
    const dispatch = useDispatch()

    // Check application status whenever singleJob or user changes
    useEffect(() => {
        if (singleJob?.applications && user?._id) {
            const hasApplied = singleJob.applications.some(
                app => app.applicant === user._id
            )
            setIsApplied(hasApplied)
            setApplicantCount(singleJob.applications.length)
        }
    }, [singleJob, user?._id])

    const applyJobHandler = async () => {
        if (isApplied) return 
         setIsLoading(true);
        try {
            const res = await axios.get(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
             
                { withCredentials: true }
            )
           console.log(res.data);
            if (res.data.success) {
                toast.success(res.data.message)
                
                // Create updated job data with new application
                const updatedJob = {
                    ...singleJob,
                    applications: [
                        ...(singleJob?.applications || []),
                        { applicant: user._id }
                    ]
                }

                // Update local state
                setIsApplied(true)
                setApplicantCount(prev => prev + 1)
                
                // Update Redux store
                dispatch(setSingleJob(updatedJob))
            }
        } catch (error) {
            console.error("Application error:", error)
            toast.error(error.response?.data?.message || "Failed to apply")
        } finally {
            setIsLoading(false)
        }
    }

    const fetchJobDetails = async () => {
        try {
            const res = await axios.get(
                `${JOB_API_END_POINT}/get/${jobId}`,
                { withCredentials: true }
            )
            
            if (res.data.success) {
                dispatch(setSingleJob(res.data.job))
                setApplicantCount(res.data.job?.applications?.length || 0)
            }
        } catch (error) {
            console.error("Fetch error:", error)
            toast.error("Failed to load job details")
        }
    }

    useEffect(() => {
        if (jobId) {
            fetchJobDetails()
        }
    }, [jobId])

    return (
        <div className="dark-theme">
            <Navbar/>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="job-description-container"
            >
                <motion.div 
                    className="job-card"
                    initial={{ rotateX: -10, rotateY: -5 }}
                    animate={{ rotateX: 0, rotateY: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="job-header">
                        <div className="job-title-section">
                            <h1 className="job-title">{singleJob?.title}</h1>
                            <div className="job-badges">
                                <Badge className="position-badge">
                                    <FaUsers className="icon"/> {singleJob?.position} Positions
                                </Badge>
                                <Badge className="type-badge">
                                    <FaClock className="icon"/> {singleJob?.jobType}
                                </Badge>
                                <Badge className="salary-badge">
                                    <FaRupeeSign className="icon"/> {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>

                        <div className="apply-section">
                            {isApplied && (
                                <div className="already-applied">
                                    <FaCheckCircle className="icon"/>
                                    <span>You have already applied</span>
                                </div>
                            )}
                            
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="apply-button-container"
                            >
                                <Button
                                    onClick={applyJobHandler}
                                    disabled={isApplied || isLoading}
                                    className={`apply-button ${isApplied ? 'applied' : ''}`}
                                >
                                    {isLoading ? (
                                        "Processing..."
                                    ) : isApplied ? (
                                        <>
                                            <FaCheckCircle className="icon"/> Applied
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane className="icon"/> Apply Now
                                        </>
                                    )}
                                </Button>
                                <div className="applicants-count1">
                                    <FaUserFriends className="icon"/> {applicantCount} applicants
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div className="job-details">
                        <div className="details-header">
                            <h2 className="section-title">
                                <FaInfoCircle className="icon"/> Job Details
                            </h2>
                            <div className="posted-date">
                                <FaCalendarAlt className="icon"/> Posted: {new Date(singleJob?.createdAt).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="details-grid">
                            <DetailItem 
                                icon={<FaBriefcase className="detail-icon"/>} 
                                label="Role" 
                                value={singleJob?.title} 
                            />
                            <DetailItem 
                                icon={<FaMapMarkerAlt className="detail-icon"/>} 
                                label="Location" 
                                value={singleJob?.location} 
                            />
                            <DetailItem 
                                icon={<FaFileAlt className="detail-icon"/>} 
                                label="Description" 
                                value={singleJob?.description} 
                                fullWidth
                            />
                            <DetailItem 
                                icon={<FaChartLine className="detail-icon"/>} 
                                label="Experience" 
                                value={`${singleJob?.experienceLevel} yrs`} 
                            />
                            <DetailItem 
                                icon={<FaRupeeSign className="detail-icon"/>} 
                                label="Salary" 
                                value={`${singleJob?.salary} LPA`} 
                            />
                            <DetailItem 
                                icon={<FaUserGraduate className="detail-icon"/>} 
                                label="Level" 
                                value={singleJob?.seniority || "Senior"} 
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>
            <Footer/>
        </div>
    )
}

const DetailItem = ({ icon, label, value, fullWidth = false }) => (
    <motion.div 
        className={`detail-item ${fullWidth ? 'full-width' : ''}`}
        whileHover={{ scale: 1.02 }}
    >
        <div className="icon-container">
            {icon}
        </div>
        <div className="detail-content">
            <span className="detail-label">{label}</span>
            <span className="detail-value">{value}</span>
        </div>
    </motion.div>
)

export default JobDescription
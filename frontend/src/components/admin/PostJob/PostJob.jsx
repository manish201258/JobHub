import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader2, Briefcase, FileText, ListChecks, DollarSign, MapPin, Clock, Award, Users } from 'lucide-react';
import Navbar from '../../shared/navbar/Navbar';
import './PostJob.css';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({...input, companyId: selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-job-container">
            <Navbar />
            <motion.div 
                className="post-job-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.form 
                    onSubmit={submitHandler}
                    className="post-job-card"
                    initial={{ rotateX: -5, rotateY: -2 }}
                    animate={{ rotateX: 0, rotateY: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ 
                        boxShadow: "0 15px 30px rgba(0, 255, 0, 0.1)"
                    }}
                >
                    <motion.h1 
                        className="post-job-title"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Post New Job
                    </motion.h1>

                    <motion.div 
                        className="post-job-form-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        {/* Job Title */}
                        <div className="post-job-form-group">
                            <Label className="post-job-label">
                                <Briefcase className="post-job-icon" />
                                Title
                            </Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="post-job-input"
                                required
                            />
                        </div>

                        {/* Job Description */}
                        <div className="post-job-form-group">
                            <Label className="post-job-label">
                                <FileText className="post-job-icon" />
                                Description
                            </Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="post-job-input"
                                required
                            />
                        </div>

                        {/* Requirements */}
                        <div className="post-job-form-group">
                            <Label className="post-job-label">
                                <ListChecks className="post-job-icon" />
                                Requirements
                            </Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="post-job-input"
                                required
                            />
                        </div>

                        {/* Salary */}
                        <div className="post-job-form-group">
                            <Label className="post-job-label">
                                <DollarSign className="post-job-icon" />
                                Salary
                            </Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="post-job-input"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div className="post-job-form-group">
                            <Label className="post-job-label">
                                <MapPin className="post-job-icon" />
                                Location
                            </Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="post-job-input"
                                required
                            />
                        </div>

                        {/* Job Type */}
                        <div className="post-job-form-group">
                            <Label className="post-job-label">
                                <Clock className="post-job-icon" />
                                Job Type
                            </Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="post-job-input"
                                required
                            />
                        </div>

                        {/* Experience Level */}
                        <div className="post-job-form-group">
                            <Label className="post-job-label">
                                <Award className="post-job-icon" />
                                Experience Level
                            </Label>
                            <Input
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="post-job-input"
                                required
                            />
                        </div>

                        {/* Number of Positions */}
                        <div className="post-job-form-group">
                            <Label className="post-job-label">
                                <Users className="post-job-icon" />
                                No of Positions
                            </Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="post-job-input"
                                required
                                min="1"
                            />
                        </div>

                        {/* Company Selector */}
                        {companies.length > 0 && (
                            <div className="post-job-form-group post-job-company-select">
                                <Label className="post-job-label">Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="post-job-select-trigger">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent className="post-job-select-content">
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem 
                                                    key={company._id} 
                                                    value={company?.name?.toLowerCase()}
                                                    className="post-job-select-item"
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div 
                        className="post-job-submit-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {loading ? (
                            <Button className="post-job-submit-btn" disabled>
                                <Loader2 className="post-job-spinner" />
                                Please wait
                            </Button>
                        ) : (
                            <motion.button
                                className="post-job-submit-btn"
                                type="submit"
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                disabled={companies.length === 0}
                            >
                                Post New Job
                            </motion.button>
                        )}
                    </motion.div>

                    {companies.length === 0 && (
                        <motion.p 
                            className="post-job-error-message"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            *Please register a company first, before posting jobs
                        </motion.p>
                    )}
                </motion.form>
            </motion.div>
        </div>
    );
};

export default PostJob;
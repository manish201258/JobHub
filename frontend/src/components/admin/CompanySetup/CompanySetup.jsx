import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../ui/button';
import { ArrowLeft, Loader2, Upload } from 'lucide-react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../../hooks/useGetCompanyById';
import Navbar from '../../shared/navbar/Navbar';
import './CompanySetup.css';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const { singleCompany } = useSelector(store => store.company);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            });
            if (singleCompany.logo) {
                setPreview(singleCompany.logo);
            }
        }
    }, [singleCompany]);

    return (
        <div className="company-setup-container">
            <Navbar />
            <motion.div 
                className="company-setup-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.form 
                    className="company-setup-card"
                    onSubmit={submitHandler}
                    initial={{ rotateX: -5, rotateY: -2 }}
                    animate={{ rotateX: 0, rotateY: 0 }}
                    transition={{ duration: 0.8 }}
                    whileHover={{ 
                        boxShadow: "0 15px 30px rgba(0, 255, 0, 0.1)"
                    }}
                >
                    <motion.div 
                        className="company-setup-header"
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <motion.button
                            className="company-setup-back-btn"
                            onClick={() => navigate("/admin/companies")}
                            whileHover={{ 
                                scale: 1.05,
                                borderColor: '#00ff00'
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ArrowLeft className="company-setup-back-icon" />
                            <span>Back</span>
                        </motion.button>
                        <motion.h1 
                            className="company-setup-title"
                            whileHover={{ scale: 1.02 }}
                        >
                            Company Setup
                        </motion.h1>
                    </motion.div>

                    <motion.div 
                        className="company-setup-form-grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="company-setup-form-group">
                            <Label className="company-setup-label">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="company-setup-input"
                            />
                        </div>

                        <div className="company-setup-form-group">
                            <Label className="company-setup-label">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="company-setup-input"
                            />
                        </div>

                        <div className="company-setup-form-group">
                            <Label className="company-setup-label">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="company-setup-input"
                            />
                        </div>

                        <div className="company-setup-form-group">
                            <Label className="company-setup-label">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="company-setup-input"
                            />
                        </div>

                        <div className="company-setup-form-group company-setup-logo-group">
                            <Label className="company-setup-label">Logo</Label>
                            <motion.div 
                                className="company-setup-logo-upload"
                                whileHover={{ scale: 1.02 }}
                            >
                                {preview && (
                                    <motion.img 
                                        src={preview} 
                                        alt="Company Logo Preview" 
                                        className="company-setup-logo-preview"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                )}
                                <Label className="company-setup-upload-btn">
                                    <Upload className="company-setup-upload-icon" />
                                    <span>Upload Logo</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="company-setup-file-input"
                                    />
                                </Label>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="company-setup-submit-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        {loading ? (
                            <Button className="company-setup-submit-btn" disabled>
                                <Loader2 className="company-setup-spinner" />
                                Please wait
                            </Button>
                        ) : (
                            <motion.button
                                className="company-setup-submit-btn"
                                type="submit"
                                whileHover={{ 
                                    scale: 1.05,
                                    boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Update Company
                            </motion.button>
                        )}
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    );
};

export default CompanySetup;
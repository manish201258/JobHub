import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaBriefcase, FaArrowRight } from "react-icons/fa";
import "./AdminHome.css";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

const AdminHome = () => {
  const [counters, setCounters] = useState({
    jobs: 0,
    companies: 0,
    candidates: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          animateCounters();
          setHasAnimated(true);
          observer.unobserve(componentRef.current);
        }
      },
      { threshold: 0.5 }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 3000; // 3 seconds
    const startTime = performance.now();
    const targetValues = {
      jobs: 1000,
      companies: 100,
      candidates: 10000,
    };

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      setCounters({
        jobs: Math.floor(progress * targetValues.jobs),
        companies: Math.floor(progress * targetValues.companies),
        candidates: Math.floor(progress * targetValues.candidates),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final values are set
        setCounters(targetValues);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
      <Navbar />
      <div className="admin-home-scrollable">
        {/* Hero Section */}
        <motion.section
          className="admin-hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="admin-hero-content">
            <motion.h1
              className="admin-hero-title"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to <span className="admin-hero-highlight">JobHub</span> Admin
            </motion.h1>
            <motion.p
              className="admin-hero-text"
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Manage your company and job postings with our powerful dashboard
            </motion.p>
            <motion.div
              className="admin-hero-image-container"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="JobHub Hero"
                className="admin-hero-image"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Stats Section (Fixed Issue Here) */}
        <div className="main2-stats" ref={componentRef}>
          <div className="main2-stat-item">
            <span className="main2-stat-number">{counters.jobs.toLocaleString()}</span>
            <span className="main2-stat-label">Jobs Posted</span>
          </div>
          <div className="main2-stat-item">
            <span className="main2-stat-number">{counters.companies.toLocaleString()}</span>
            <span className="main2-stat-label">Companies</span>
          </div>
          <div className="main2-stat-item">
            <span className="main2-stat-number">{counters.candidates.toLocaleString()}</span>
            <span className="main2-stat-label">Candidates</span>
          </div>
        </div>

        {/* Other sections */}
          {/* Register Company Section */}
      <motion.section 
        className="admin-register-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="admin-register-content">
          <div className="admin-register-text">
            <h2 className="admin-section-title">
              <FaBuilding className="admin-section-icon" /> Register Your Company
            </h2>
            <p className="admin-section-description">
              Get started by registering your company to post jobs and find the best talent
            </p>
            <motion.button 
              className="admin-action-btn"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/admin/companies'}
            >
              Register Now <FaArrowRight />
            </motion.button>
          </div>
          <div className="admin-register-image">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Register Company" 
            />
          </div>
        </div>
      </motion.section>

      {/* Create Job Section */}
      <motion.section 
        className="admin-createjob-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="admin-createjob-content">
          <div className="admin-createjob-image">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
              alt="Create Job" 
            />
          </div>
          <div className="admin-createjob-text">
            <h2 className="admin-section-title">
              <FaBriefcase className="admin-section-icon" /> Create New Job Posting
            </h2>
            <p className="admin-section-description">
              Reach thousands of qualified candidates by posting your job opportunities
            </p>
            <motion.button 
              className="admin-action-btn"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/admin/jobs'}
            >
              Post a Job <FaArrowRight />
            </motion.button>
          </div>
        </div>
      </motion.section>
      </div>
      <Footer />
    </>
  );
};

export default AdminHome;

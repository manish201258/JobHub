import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';
import Footer from '@/components/shared/footer/Footer';
import Navbar from '@/components/shared/navbar/Navbar';

const ContactPage = () => {
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <>
    <Navbar/>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="contact-container"
    >
      <div className="contact-hero">
        <motion.h1
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.8 }}
          className="contact-title"
        >
          Get in <span className="text-neon">Touch</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="contact-subtitle"
        >
          We'd love to hear from you
        </motion.p>
      </div>

      <div className="contact-content">
        <motion.form 
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="contact-form"
        >
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              type="text" 
              id="name" 
              className="form-input"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea 
              id="message" 
              className="form-textarea"
              placeholder="Your message here..."
              rows="5"
              required
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="submit-btn"
          >
            Send Message
          </motion.button>
        </motion.form>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="contact-info"
        >
          <div className="info-card">
            <h3 className="info-title">Contact Information</h3>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <p>Poornima University Jaipur</p>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <p>contact@jobhub.com</p>
            </div>
          </div>

          <motion.div 
            whileHover={{ rotateY: 15 }}
            className="social-links"
          >
            <a href="#" className="social-icon">📱</a>
            <a href="#" className="social-icon">💻</a>
            <a href="#" className="social-icon">🔗</a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
    <Footer/>
    </>
  );
};

export default ContactPage;
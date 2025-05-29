import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './AboutPage.css';
import Footer from '@/components/shared/footer/Footer';
import Navbar from '@/components/shared/navbar/Navbar';
import ReviewsSection from '@/components/shared/ReviewSection/ReviewsSection';

// Mock team members data
const teamMembers = [
  {
    id: 1,
    name: "Manish Jangir",
    role: "CEO & Founder",
    image: "httphttps://photos.app.goo.gl/5muvJErXF1CLjncB6s://media.licdn.com/dms/image/v2/D5635AQGh1snuKzRZOA/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1718462738768?e=1744354800&v=beta&t=FsoKe-50xTYOnaijep9WkktMT4faRMpdNa1xT3vEoDI",
    bio: "HR tech visionary with 15+ years experience"
  }
];

// Mock reviews data
const reviews = [
  {
    id: 1,
    name: "TechCorp Inc.",
    text: "JobHub reduced our hiring time by 60% with their AI matching system.",
    rating: 5
  },
  {
    id: 2,
    name: "StartUp Ventures",
    text: "Found our perfect CTO through JobHub in just 2 weeks!",
    rating: 5
  },
  {
    id: 3,
    name: "Global Enterprises",
    text: "The quality of candidates is unmatched. Worth every penny.",
    rating: 4
  }
];

const AboutPage = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <>
    <Navbar/>
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="about-container"
      ref={ref}
    >
      {/* Hero Section */}
      <section className="about-hero">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1 className="about-title">
            About <span className="neon-text">JobHub</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="hero-subtitle"
          >
            Revolutionizing the way you find and hire talent
          </motion.p>
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hero-image-container"
        >
          <div className="hero-image"></div>
          <div className="glow-effect"></div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <motion.div 
          className="mission-card"
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="mission-content">
            <motion.h2 
              className="section-title"
              initial={{ x: -50, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              JobHub connects top talent with leading companies through an intuitive platform 
              powered by AI matching technology. We're transforming the recruitment landscape 
              with transparency and efficiency.
            </motion.p>
          </div>
          <motion.div 
            className="mission-image"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          ></motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            animate={{ 
              y: [0, -10, 0],
              transition: { 
                repeat: Infinity, 
                duration: 4,
                ease: "easeInOut"
              } 
            }}
          >
            <motion.p className="stat-number">1000+</motion.p>
            <p className="stat-label">Jobs Posted</p>
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            animate={{ 
              y: [0, -10, 0],
              transition: { 
                repeat: Infinity, 
                duration: 4,
                delay: 0.5,
                ease: "easeInOut"
              } 
            }}
          >
            <motion.p className="stat-number">100+</motion.p>
            <p className="stat-label">Companies</p>
          </motion.div>
          
          <motion.div 
            className="stat-card"
            whileHover={{ scale: 1.05 }}
            animate={{ 
              y: [0, -10, 0],
              transition: { 
                repeat: Infinity, 
                duration: 4,
                delay: 1,
                ease: "easeInOut"
              } 
            }}
          >
            <motion.p className="stat-number">100,000+</motion.p>
            <p className="stat-label">Candidates</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <motion.h2 
          className="section-title"
          initial={{ x: -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Team
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Founded in 2025 by industry veterans, our team combines decades of HR tech 
          experience with cutting-edge engineering talent to build the future of hiring.
        </motion.p>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.id}
              className="team-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="team-image-container">
                <div 
                  className="team-image"
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
                <div className="image-glow"></div>
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <ReviewsSection/>

      {/* <section className="reviews-section">
        <motion.h2 
          className="section-title"
          initial={{ x: -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          What Our Clients Say
        </motion.h2>
        
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id}
              className="review-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div className="stars">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-author">— {review.name}</p>
            </motion.div>
          ))}
        </div>
      </section> */}
    </motion.div>
    <Footer/>
    </>
  );
};

export default AboutPage;
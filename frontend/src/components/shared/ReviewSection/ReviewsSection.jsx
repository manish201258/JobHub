import React from 'react';
import './ReviewsSection.css';

const ReviewsSection = () => {
  return (
    <section className="testimonials-section">
      <h2 className="section-heading">What Our Clients Say</h2>
      <div className="testimonials-grid">
        
        <div className="testimonial-card">
          <div className="rating">★★★★★</div>
          <div className="quote-icon">“</div>
          <p className="testimonial-text">
            JobHub reduced our hiring time by 60% with their AI matching system.
          </p>
          <div className="client-info">
            <div className="decorative-line"></div>
            <p className="client-name">TechCorp Inc.</p>
          </div>
          <div className="glow-effect"></div>
        </div>

        <div className="testimonial-card">
          <div className="rating">★★★★★</div>
          <div className="quote-icon">“</div>
          <p className="testimonial-text">
            Found our perfect CTO through JobHub in just 2 weeks!
          </p>
          <div className="client-info">
            <div className="decorative-line"></div>
            <p className="client-name">StartUp Ventures</p>
          </div>
          <div className="glow-effect"></div>
        </div>

        <div className="testimonial-card">
          <div className="rating">★★★★★</div>
          <div className="quote-icon">“</div>
          <p className="testimonial-text">
            The quality of candidates is unmatched. Worth every penny.
          </p>
          <div className="client-info">
            <div className="decorative-line"></div>
            <p className="client-name">Global Enterprises</p>
          </div>
          <div className="glow-effect"></div>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
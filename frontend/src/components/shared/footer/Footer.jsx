import React from 'react'

import './Footer.css'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <div className="mt-5">
               <h1 className=' text-4xl font-bold'>Job<span className='text-green-500'>Hub</span></h1>
            </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos, et repudiandae. Minus possimus earum neque excepturi. Ad nulla repudiandae quidem?</p>
                 <div className="footer-social-icon">
                     <img src=''  alt="" />
                     <img  src='' alt="" />
                     <img src="" alt="" />
                 </div>
            </div>
            <div className="footer-content-center">
                <h2><span className='text-green-500 text-2xl font-bold'>Company</span></h2>
                <ul className='footer-ul'>
                    <li><Link to='/'>Home</Link></li>
                   <li><Link to='/about'>About us</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                    <li>Privacy Policy</li>
                </ul>
             </div>
            <div className="footer-content-right">
                    <h2><span className='text-green-500  text-2xl font-bold'>GET IN TOUCH</span></h2>

                    <ul>
                        <li>+91-9351814612</li>
                        <li>manish201258@gmail.com</li>
                    </ul>
            </div>
           
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @Manish-JobHub.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
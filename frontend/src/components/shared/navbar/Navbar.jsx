import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { LogOut, User2, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  });


   const navigate=useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container1">
        <div className="logo-container">
          <Link to='/' className="logo-link">
            <h1 className="logo">Job<span className="logo-highlight">Hub</span></h1>
            <div className="logo-glow"></div>
          </Link>
        </div>

        <button 
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {
              user && user.role=='recruiter'? (
                <>
                <li className="nav-item">
              <Link to='/admin/home' className="nav-link">Home</Link>
              <div className="nav-underline"></div>
            </li>
            <li className="nav-item">
              <Link to='/admin/companies' className="nav-link">Companies</Link>
              <div className="nav-underline"></div>
            </li>
            <li className="nav-item">
              <Link to='/admin/jobs' className="nav-link">Jobs</Link>
              <div className="nav-underline"></div>
            </li>
            <li className="nav-item">
              <Link to='/about' className="nav-link">About</Link>
              <div className="nav-underline"></div>
            </li>
            <li className="nav-item">
              <Link to='/contact' className="nav-link">Contact</Link>
              <div className="nav-underline"></div>
            </li>
                </>
              ):(
                <>
                <li className="nav-item">
              <Link to='/' className="nav-link">Home</Link>
              <div className="nav-underline"></div>
            </li>
            <li className="nav-item">
              <Link to='/jobs' className="nav-link">Jobs</Link>
              <div className="nav-underline"></div>
            </li>
            <li className="nav-item">
              <Link to='/browse' className="nav-link">Browse</Link>
              <div className="nav-underline"></div>
            </li>
            <li className="nav-item">
              <Link to='/about' className="nav-link">About</Link>
              <div className="nav-underline"></div>
            </li>
            <li className="nav-item">
              <Link to='/contact' className="nav-link">Contact</Link>
              <div className="nav-underline"></div>
            </li>
                </>
              )
            }
            
          </ul>

          {!user ? (
            <div className='auth-buttons'>
              <Link to="/login" className="auth-btn login-btn">
                <span>Login</span>
                <div className="btn-glow"></div>
              </Link>
              <Link to="/signup" className="auth-btn signup-btn">
                <span>Signup</span>
                <div className="btn-glow"></div>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="user-avatar">
                  <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                  <div className="avatar-glow"></div>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="user-popup" sideOffset={10}>
                <div className="user-info">
                  <Avatar className="user-avatar-popup">
                    <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                  </Avatar>
                  <div className="user-details">
                    <h4 className="user-name">{user.fullname || "User"}</h4>
                    <p className="user-title">{user.role || "Member"}</p>
                  </div>
                </div>
                <div className="user-actions">
                  {
                    user && user.role=='recruiter'?(
                      <>

                      </>
                    ):
                    (
                      <>
                      <Link to="/profile" className="user-action">
                    <User2 className="action-icon" size={16} />
                    <span className="action-text">Profile</span>
                  </Link>
                      </>
                    )
                  }
                  
                  <button className="user-action" onClick={handleLogout}>
                    <LogOut className="action-icon" size={16} />
                    <span className="action-text">Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <div className="navbar-shadow"></div>
    </nav>
  );
};

export default Navbar;
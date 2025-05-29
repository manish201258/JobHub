import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Login from './components/shared/Login/Login';

import Home from './pages/Home/Home';
import './App.css';
import Signup from './components/shared/Signup/Signup';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AboutPage from './pages/About/AboutPage';
import ContactPage from './pages/ContactUs/ContactPage';
import Jobs from './pages/Jobs/Jobs';
import Browse from './pages/Browse/Browse';
import Profile from './pages/Profile/Profile';
import JobDescription from './pages/JobDescription/JobDescription';
import AdminHome from './pages/AdminHome/AdminHome';
import AdminCompanies from './pages/AdminCompanies/AdminCompanies';
import ProtectedRoute from './components/admin/ProtectedRoute';
import CompanyCreate from './components/admin/CompanyCreate/CompanyCreate';
import CompanySetup from './components/admin/CompanySetup/CompanySetup';
import PostJob from './components/admin/PostJob/PostJob';
import AdminJobs from './pages/AdminJobs/AdminJobs';
import Applicants from './components/admin/Applicants/Applicants';

function App() {

  return (
    <>
    <ToastContainer/>
    <Router>
      <div className="app-container">
      
        <Routes>
          <Route path="/" element={<Home/>} />
         
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/signup" element={<AuthPage type="register" />} />
          <Route path='/about'  element={<AboutPage/>}/>
          <Route path="/contact" element={<ContactPage/>}/>
           <Route path='/jobs' element={<Jobs/>}/>
           <Route path='/browse' element={<Browse/>}/>
           <Route path='/profile' element={<Profile/>}/>
           <Route path="/description/:id" element={<JobDescription/>} />
           <Route path="/admin/home" element={<ProtectedRoute> <AdminHome/></ProtectedRoute>}/>
           <Route path='/admin/companies' element={<ProtectedRoute><AdminCompanies/></ProtectedRoute>}/>
           <Route path='/admin/companies/create' element={<ProtectedRoute><CompanyCreate/></ProtectedRoute>}/>
           <Route path='/admin/companies/:id' element={<ProtectedRoute><CompanySetup/></ProtectedRoute>}/>
           <Route path='/admin/jobs' element={<ProtectedRoute><AdminJobs/></ProtectedRoute>}/>
           <Route path='admin/jobs/create' element={<ProtectedRoute><PostJob/></ProtectedRoute>}/>
          <Route path='/admin/jobs/:id/applicants' element={<ProtectedRoute><Applicants/></ProtectedRoute>}/>
        </Routes>
        
      </div>
    </Router>
    </>
  );
}

function AuthPage({ type }) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="auth-modal-container">
        {type === 'login' ? (
          <Login onClose={handleClose} />
        ) : (
          <Signup onClose={handleClose} />
        )}
      </div>
    </div>
  );
}

export default App;


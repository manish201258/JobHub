import CategoryCarousel from '@/components/shared/CategoryCarousel/CategoryCarousel'
import Footer from '@/components/shared/footer/Footer'
import LatestJobs from '@/components/shared/LatestJobs/LatestJobs'
import Main from '@/components/shared/main/Main'
import Main2 from '@/components/shared/main2/Main2'
import Navbar from '@/components/shared/navbar/Navbar'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();

   const {user} = useSelector(store=>store.auth);
   const navigate=useNavigate(); 
   useEffect(() => {
    if (!user) {
      navigate('/'); // Ensure logged-out users go to '/'
      return;
    }
  
    if (user.role === 'recruiter') {
      navigate('/admin/home');
    } else {
      navigate('/');
    }
  }, [user, navigate]); // Now it re-runs when `user` changes
  
   
    return (
     
    <div>
        <Navbar/>
        <Main/>
        <Main2/>
        <CategoryCarousel/>
        <LatestJobs/>
    
        <Footer/>
    </div>
  )
}

export default Home
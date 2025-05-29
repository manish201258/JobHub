import React from 'react'
import './LatestJobs.css'
import LatestJobCards from '../LatestJobCards/LatestJobCards'
import { useSelector } from 'react-redux'

const LatestJobs = () => {
  // Static demo jobs data
   const {allJobs}=useSelector(store=>store.job)

  return (
    <section className="jobs-section">
      <div className="jobs-container">
        <h1 className="jobs-title">
          <span className="jobs-title-highlight">Latest & Top</span> Job Openings
        </h1>
        
        <div className="jobs-grid">
          {allJobs.length<=0?<span>No Job Available</span> :allJobs.map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default LatestJobs
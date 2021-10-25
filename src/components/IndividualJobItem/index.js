import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBagFill} from 'react-icons/bs'

import './index.css'

const IndividualJobItem = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <Link to={`/jobs/${id}`} className="item-link">
      <div className="job-card-individual">
        <div className="top-section-card">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="job-company-logo"
          />
          <div className="title-rating-container">
            <h1 className="heading-title">{title}</h1>
            <div className="icon-container">
              <AiFillStar className="rating-color" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="middile-section-card">
          <div className="row-section-seperator-from-salary">
            <div className="location-section icon-container ">
              <MdLocationOn />
              <p className="rating-para">{location}</p>
            </div>
            <div className="job-type-section icon-container">
              <BsFillBagFill />
              <p className="rating-para">{employmentType}</p>
            </div>
          </div>
          <div className="salary-section icon-container">
            <p className="rating-para">{packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1 className="description-heading">Description</h1>
          <p className="job-description-para">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}
export default IndividualJobItem

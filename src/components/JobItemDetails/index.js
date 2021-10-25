import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn} from 'react-icons/md'

import {BsFillBagFill} from 'react-icons/bs'

import Header from '../Header'

import SimilarJobsIndividual from '../SimilarJobsIndividual'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  empty: 'EMPTY',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: [],
    lifeAtCompany: [],
    skills: [],
    simalarJobs: [],
    isLoading: true,
    failure: false,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getjobItemData()
  }

  getjobItemData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skills = data.job_details.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))
      const simalarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobDetails,
        lifeAtCompany,
        skills,
        simalarJobs,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  retryFecthCall = () => {
    this.getjobItemData()
  }

  failureResponse = () => (
    <>
      <Header />
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1 className="text-white">Oops! Something Went Wrong</h1>
      <p className="text-white">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.retryFecthCall}>
        Retry
      </button>
    </>
  )

  renderSuccess = () => {
    const {
      jobDetails,
      lifeAtCompany,
      skills,
      simalarJobs,
      isLoading,
    } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <Header />
        <div className="job-info">
          <div className="job-card-individual-new">
            <div className="top-section-card">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job details company logo"
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
              <ul className="row-section-seperator-from-salary">
                <div className="location-section icon-container ">
                  <MdLocationOn />
                  <p className="rating-para">{location}</p>
                </div>
                <div className="job-type-section icon-container">
                  <BsFillBagFill />
                  <p className="rating-para">{employmentType}</p>
                </div>
              </ul>
              <div className="salary-section icon-container">
                <p className="rating-para">{packagePerAnnum}</p>
              </div>
            </div>
            <hr />
            <div>
              <div>
                <h1 className="description-heading">Description</h1>
                <a href={companyWebsiteUrl}>Visit</a>
              </div>
              <p className="job-description-para">{jobDescription}</p>
            </div>
            <div className="skills-section">
              <h1 className="description-heading">Skills</h1>
              <ul className="skills-container-techno">
                {skills.map(each => (
                  <li className="techno-skill-list-individual">
                    <div className="techno-skills">
                      <img
                        src={each.imageUrl}
                        alt={each.name}
                        className="logo-techno-image-design"
                      />
                      <p>{each.name}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="life-at-company-section">
              <h1 className="description-heading">Life at Company</h1>
              <div className="life-at-company-flex-container">
                <p>{description}</p>
                <img src={imageUrl} alt="life at company" />
              </div>
            </div>
          </div>
          <h1 className="text-white">Similar Jobs</h1>
          <ul className="similar-jobs-list">
            {simalarJobs.map(each => (
              <SimilarJobsIndividual key={each.id} details={each} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <div testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.failureResponse()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }
}

export default JobItemDetails

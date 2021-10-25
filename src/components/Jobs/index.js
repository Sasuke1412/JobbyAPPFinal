import {Component} from 'react'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import SelectionEmploymentTag from '../SelectionEmploymentTag'

import SelectionSalaryTag from '../SelectionSalaryTag'

import IndividualJobItem from '../IndividualJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  empty: 'EMPTY',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    failureOfFetch: false,
    userDetails: {},
    selected: [],
    searchInput: '',
    salaryParameter: '',
    employeeParameter: '',
    jobsList: [],
    isLoading: false,
    failureToLoadProfile: false,
    apiStatusProfile: apiStatusConstants.initial,
    apiStatusJob: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.profileData()
    this.getAllJobsSection()
  }

  profileData = async () => {
    this.setState({apiStatusProfile: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const userDetailss = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      // console.log(userDetails)
      this.setState({
        userDetails: userDetailss,
        apiStatusProfile: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({apiStatusProfile: apiStatusConstants.failure})
    }
  }

  retryProfile = () => {
    this.profileData()
  }

  renderProfile = () => {
    const {userDetails, failureToLoadProfile} = this.state
    const {name, profileImageUrl, shortBio} = userDetails

    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" className="avatar-design" />
        <h1 className="user-name">{name}</h1>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  renderProfileFailureView = () => (
    <>
      <button type="button" onClick={this.retryProfile}>
        Retry
      </button>
    </>
  )

  profileSection = () => {
    const {apiStatusProfile} = this.state
    switch (apiStatusProfile) {
      case apiStatusConstants.success:
        return this.renderProfile()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  TypesofEmployment = () => (
    <div className="employee-adjust">
      <h1 className="text-white">Type of Employment</h1>
      <ul className="list-style-none">
        {employmentTypesList.map(each => (
          <SelectionEmploymentTag
            key={each.id}
            details={each}
            handleEmploymentQueryParameter={this.handleEmploymentQueryParameter}
          />
        ))}
      </ul>
    </div>
  )

  handleSalaryQueryParameter = (id, TF) => {
    const salQ = {
      id,
      TF,
    }
    const {salaryParameter} = this.state
    console.log(salaryParameter)
    this.setState({salaryParameter: id}, this.getAllJobsSection)
  }

  handleEmploymentQueryParameter = (eId, TF) => {
    const empQ = {
      eId,
      TF,
    }
    const {selected} = this.state
    console.log(selected)
    if (TF === true && !(eId in selected)) {
      const find = selected.indexOf(eId)
      selected.push(eId)
    }
    if (TF === false && eId in selected) {
      const find = selected.indexOf(eId)
      selected.splice(find, 1)
    }
    this.setState({selected}, this.getAllJobsSection)
  }

  TypesofSalary = () => {
    const {salaryParameter} = this.state
    return (
      <div className="salary-adjust">
        <h1 className="text-white">Salary Range</h1>
        <ul className="list-style-none">
          {salaryRangesList.map(each => (
            <SelectionSalaryTag
              key={each.salaryRangeId}
              details={each}
              handleSalaryQueryParameter={this.handleSalaryQueryParameter}
              salaryParameter={salaryParameter}
            />
          ))}
        </ul>
      </div>
    )
  }

  handleSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  handleFormSubmittion = event => {
    const {searchInput} = this.state
    event.preventDefault()
    //  console.log(searchInput)
    this.getAllJobsSection()
  }

  getAllJobsSection = async () => {
    const {searchInput, salaryParameter, apiStatusJob, selected} = this.state
    this.setState({
      apiStatusJob: apiStatusConstants.inProgress,
    })
    const employeeParameters = selected.join(',')
    console.log(employeeParameters)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeParameters}&minimum_package=${salaryParameter}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const arra = data.jobs
    if (response.ok === true) {
      //  console.log(data)
      const updatedData = data.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      if (arra.length === 0) {
        this.setState({
          apiStatusJob: apiStatusConstants.empty,
        })
      } else {
        this.setState({
          jobsList: updatedData,
          apiStatusJob: apiStatusConstants.success,
        })
      }
    }
    if (response.status === 401) {
      this.setStatus({apiStatusJob: apiStatusConstants.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  retry = () => {
    this.getAllJobsSection()
  }

  renderJobsSuccessList = () => {
    const {jobsList} = this.state
    return (
      <ul className="job-list-view-align">
        {jobsList.map(each => (
          <IndividualJobItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderJobsFailureView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
      />
      <h1 className="text-white">Oops! Something Went Wrong</h1>
      <p className="text-white">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.retry}>
        Retry
      </button>
    </>
  )

  renderEmptyView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="text-white">No Jobs Found</h1>
      <p className="text-white">
        We could not find any jobs. Try other filters.
      </p>
    </>
  )

  renderAllJobs = () => {
    const {apiStatusJob} = this.state
    switch (apiStatusJob) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessList()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.empty:
        return this.renderEmptyView()
      default:
        return null
    }
  }

  render() {
    const {
      searchInput,
      salaryParameter,
      employeeParameter,
      isLoading,
    } = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="left-align-container">
            <div className="Proile-Query-selector-container">
              {this.profileSection()}
              <hr className="horizontal-divider" />
              {this.TypesofEmployment()}
              <hr className="horizontal-divider" />
              {this.TypesofSalary()}
            </div>
          </div>

          <div className="All-Jobs-Container">
            <div className="search-bar-container">
              <form onSubmit={this.handleFormSubmittion} className="form-align">
                <input
                  type="search"
                  placeholder="search"
                  value={searchInput}
                  onChange={this.handleSearchInput}
                />

                <button type="submit" testid="searchButton">
                  <BsSearch className="search-icon" />
                </button>
              </form>
            </div>

            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs

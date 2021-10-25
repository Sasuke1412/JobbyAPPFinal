import {withRouter, Redirect, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import Header from '../Header'

import './index.css'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    const {history} = props
    history.replace('/login')
  }
  const redirectToJobs = () => {
    const {history} = props
    history.push('/jobs')
  }
  return (
    <div className="home-bg-container">
      <Header />
      <div className="description-home-container">
        <h1 className="heading-home text-white">
          Find The Job That Fits Your Life
        </h1>
        <p className="info-home text-white ">
          Millions of People are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>

        <Link to="/jobs">
          <button
            type="button"
            className="redirect-to-jobs-button"
            onClick={redirectToJobs}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}
export default withRouter(Home)

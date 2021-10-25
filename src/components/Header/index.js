import {Link, withRouter} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'

import {BsBagFill} from 'react-icons/bs'

import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutFunction = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div>
      <nav className="nav-bar-large">
        <Link to="/" className="hyper-link-removal">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
            alt="website logo"
            className="logo-design"
          />
        </Link>
        <ul className="list-design">
          <Link to="/" className="hyper-link-removal">
            <li className="Nav-links">Home</li>
          </Link>
          <Link to="/jobs" className="hyper-link-removal">
            <li className="Nav-links">Jobs</li>
          </Link>
        </ul>
        <ul className="list-design-button">
          <li>
            <button
              type="button"
              className="log-out-design"
              onClick={logoutFunction}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <nav className="nav-bar-small">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="logo-design"
        />
        <div className="icons-row-container">
          <ul className="list-design">
            <Link to="/" className="hyper-link-removal">
              <li className="Nav-links">
                <AiFillHome />
              </li>
            </Link>
            <Link to="/jobs" className="hyper-link-removal">
              <li className="Nav-links">
                <BsBagFill />
              </li>
            </Link>
          </ul>
          <FiLogOut className="log-out-design-icon" onClick={logoutFunction} />
        </div>
      </nav>
    </div>
  )
}
export default withRouter(Header)

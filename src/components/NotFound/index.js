import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-image-design"
      />
      <h1 className="not-found-heading text-white">Page not Found</h1>
      <p className="not-found-info text-white">
        we’re sorry, the page you requested could not be found
      </p>
    </div>
  </>
)
export default NotFound

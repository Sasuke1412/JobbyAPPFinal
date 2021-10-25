import {Component} from 'react'

import './index.css'

class SelectionEmploymentTag extends Component {
  handleChangeInInput = event => {
    const {details, handleEmploymentQueryParameter} = this.props
    const {label, employmentTypeId} = details
    console.log(employmentTypeId, event.target.checked)
    handleEmploymentQueryParameter(employmentTypeId, event.target.checked)
  }

  render() {
    const {details, handleEmploymentQueryParameter} = this.props
    const {label, employmentTypeId} = details

    return (
      <li>
        <input
          type="checkBox"
          value={employmentTypeId}
          id={employmentTypeId}
          Checked={false}
          onChange={this.handleChangeInInput}
        />
        <label className="text-white" htmlFor={employmentTypeId}>
          {label}
        </label>
      </li>
    )
  }
}
export default SelectionEmploymentTag

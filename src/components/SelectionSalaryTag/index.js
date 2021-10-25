import './index.css'

const SelectionSalaryTag = props => {
  const {details, handleSalaryQueryParameter, salaryParameter} = props
  const {label, salaryRangeId} = details

  const handleChangeInInput = event => {
    // console.log(salaryRangeId, event.target.checked)
    handleSalaryQueryParameter(salaryRangeId, event.target.checked)
  }

  return (
    <li>
      <input
        type="radio"
        value={salaryRangeId}
        id={salaryRangeId}
        Checked={salaryParameter === salaryRangeId}
        onClick={handleChangeInInput}
      />
      <label className="text-white" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}
export default SelectionSalaryTag

import React, {PropTypes} from 'react'

// use when state and lifecycle functions are not needed
const SimpleSample = (props) => {
  const {colours, shape} = props

  return (
    <div>
      <h4>{colours}</h4>
      <p>{props.shape}</p>    {/*either props method can be used*/}
    </div>
  )
}

SimpleSample.propTypes = {
  colours: PropTypes.array.isRequired,
  shape: PropTypes.string
}

SimpleSample.defaultProps = {
  shape: 'triangle'
}

export default SimpleSample

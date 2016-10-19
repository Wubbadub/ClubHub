import React, {PureComponent, PropTypes} from 'react'
import {render} from 'react-dom'

// use when state and lifecycle functions are needed
export default class Sample extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      h1hover: false,
      phover: false
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string
  }

  static defaultProps = {
    body: 'Wubba-lubba-dubba'
  }

  handleH1MouseIn = () => {
    console.log('hover in h1')
    this.setState({
      h1hover: true
    })
  }

  handleH1MouseOut = () => {
    console.log('hover out h1')
    this.setState({
      h1hover:false
    })
  }

  render() {
    const {title, body} = this.props

    return(
      <div>
        <h1
          style={{color: `${this.state.h1hover ? 'red' : 'black'}`}}
          onMouseEnter={this.handleH1MouseIn}
          onMouseLeave={this.handleH1MouseOut}>
          {title}
        </h1>
        <p>{this.props.body}</p>    {/*either props method can be used*/}
      </div>
    )
  }
}

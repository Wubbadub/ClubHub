import React, {Component, PropTypes} from 'react'
import Popover from 'react-popover'
import classNames from 'classnames'

export default class Editable extends Component{
  constructor(props){
    super(props)
    this.state = {
      popover: false
    }
  }

  static propTypes = {
    form: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired
  }

  static defaultProps = {
    active: false,
    editor: null
  }

  togglePopover = () => { this.setState({popover: !this.state.popover}) }

  showPopover = () => { this.setState({popover: true}) }
  hidePopover = () => { this.setState({popover: false}) }

  render(){
    const {children, form} = this.props
    const {popover} = this.state
    return (
      <Popover className="editable-popover" isOpen={popover} preferPlace="below" body={form} onOuterAction={this.hidePopover}>
          <div className={classNames('editable', {'editing': popover})} onClick={this.togglePopover}>
            {children}
          </div>
      </Popover>
    )
  }
}

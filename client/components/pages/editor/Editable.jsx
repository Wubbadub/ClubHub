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
    children: PropTypes.node.isRequired,
    edit: PropTypes.bool.isRequired,
    inline: PropTypes.bool,
    place: PropTypes.string
  }

  static defaultProps = {
    inline: false,
    place: 'below'
  }

  togglePopover = () => { this.setState({popover: !this.state.popover}) }

  showPopover = () => { this.setState({popover: true}) }
  hidePopover = () => { this.setState({popover: false}) }

  render(){
    const {children, place, form, edit, inline} = this.props
    const {popover} = this.state
    if (edit){
      return (
        <Popover className="editable-popover" isOpen={popover} preferPlace={place} body={form} onOuterAction={this.hidePopover}>
          {inline ?
            <span className={classNames('editable', 'editable-inline', {'editing': popover})} onClick={this.togglePopover}>{children}</span>
            :
            <div className={classNames('editable', {'editing': popover})} onClick={this.togglePopover}>{children}</div>
          }
        </Popover>
      )
    } else {
      return (
        inline ? <span>{children}</span> : <div>{children}</div>
      )
    }
  }
}

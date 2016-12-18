import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import Icon from 'parts/Icon'
import ClubRepField from 'parts/ClubRepField'

export default class Team extends Component{
  constructor(props){
    super(props)
  }

  static Title = 'Club Organizers'

  static propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    addElement: PropTypes.func.isRequired,
    removeElement: PropTypes.func.isRequired
  }

  handleChange = (field, value) => {
    const d = this.props.data
    d[field] = value
    this.props.setData('team', d)
  }

  addMember = () => {
    this.props.addElement('members')
  }

  removeMember = (key) => {
    this.props.removeElement(key, 'members')
  }

  render(){
    return (
      <form className="club-reps">
        {
          this.props.data.members.map((d, i) => {
            return (
              <div key={i} className="form-group" >
                <ClubRepField label="Club Rep"
                              onChange={this.handleChange}
                              removeElement={this.removeMember}
                              data={d} index={i}
                              />
              </div>

            )
          })
        }
        <button type="button"
          className={classNames('btn', 'btn-default', 'btn-block')}
          onClick={this.addMember}>
          <span>
            <Icon icon="plus" size={1} /> Add a Member
          </span>
        </button>
      </form>
    )
  }
}

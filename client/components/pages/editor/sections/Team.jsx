import React, {Component, PropTypes} from 'react'

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
                              data={d} index={i}
                              removeElement={this.props.removeElement} />
              </div>

            )
          })
        }
      </form>
    )
  }
}

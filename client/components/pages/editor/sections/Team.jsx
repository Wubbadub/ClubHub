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

  addTeamMember = () => {
    let max = 0
    Object.keys(this.props.data).forEach((k) => {
      const cur = `${k.replace(/[^\d]*/, '')}`
      if (cur > max) max = cur
    })
    const name = `person${+max+1}`
    const copy = Object.assign({}, this.props.data[`person${+max}`])
    this.props.addElement(name, copy, true)
  }

  render(){
    return (
      <form className="club-reps">
        {
          Object.keys(this.props.data).map((person) => {
            return (
              <div key={person} className="form-group" >
                <ClubRepField label="Club Rep"
                              onChange={this.handleChange}
                              data={this.props.data[person]}
                              name={person}
                              removeElement={this.props.removeElement} />
              </div>

            )
          })
        }
      </form>
    )
  }
}

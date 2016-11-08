import React, {Component, PropTypes} from 'react'

import ClubRepField from 'parts/ClubRepField'

export default class Team extends Component{
  constructor(props){
    super(props)
  }

  static Title = 'Team'

  static propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func
  }

  handleChange = (field, value, index) => {
    const d = this.props.data

    if (index === undefined || index === null){
      d[field] = value
    } else {
      d[field][index] = value
    }

    this.props.setData('team', d)
  }

  render(){
    return (
      <form className="club-reps">
        {
          Object.keys(this.props.data).map((person) => {
            return (
              <div key={person} className="form-group" >
                <ClubRepField label="Club Rep"
                              index={person}
                              onChange={this.handleChange}
                              value={this.props.data[person]}
                              name={person} />
              </div>

            )
          })
        }
      </form>
    )
  }
}

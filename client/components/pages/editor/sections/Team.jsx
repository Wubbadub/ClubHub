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

  handleChange = (field, value) => {
    const d = this.props.data
    d[field] = value
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
                              onChange={this.handleChange}
                              data={this.props.data[person]}
                              name={person} />
              </div>

            )
          })
        }
      </form>
    )
  }
}

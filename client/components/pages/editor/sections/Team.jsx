import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

import ClubRepField from 'parts/ClubRepField'
import Icon from 'parts/Icon'

export default class Team extends Component{
  constructor(props){
    super(props)
  }

  static Title = 'Team'

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
    console.log(name)
    console.log(copy)
    this.props.addElement(name, copy)
  }

  render(){
    return (
      <form className="club-reps">
        <button type="button"
          className={classNames('btn', 'btn-block')}
          onClick={this.addTeamMember}>
          <span>
            <Icon icon="plus"
              size={0.8} /> Add New Member
          </span>
        </button>
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

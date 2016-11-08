import React, {Component, PropTypes} from 'react'

export default class Team extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    data: PropTypes.object
  }

  render() {
    return (
      <section>
        <div>
          <h1>Who</h1>
          <div className="people">

            {
              Object.keys(this.props.data).map((person) => {
                return (
                  <div key={`${person}`} className="person">
                    <span>{this.props.data[person].name} - {this.props.data[person].position}</span>
                    <a href="#" target="_blank">{this.props.data[person].email}</a>
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>
    )
  }
}

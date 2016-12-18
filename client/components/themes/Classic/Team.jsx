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
        <div className="team">
          <h1>Who</h1>
          <div className="people">
            {
              this.props.data.members.map((m, i) => {
                return (
                  <div key={i} className="person">
                    <span>{m.name} - {m.position}</span>
                    <a href="#" target="_blank">{m.email}</a>
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

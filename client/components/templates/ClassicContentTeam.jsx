import React, {PureComponent} from 'react'

export default class ClassicContentTeam extends PureComponent{
  constructor(props){
    super(props)
  }

  render() {
    return (
      <section>
        <div>
          <h1>Who</h1>
          <div className="people">
            <div className="person">
              <span>Chris Henley</span>
              <a href="#" target="_blank">facebook.com/chrishenley</a>
            </div>
            <div className="person">
              <span>Misha Turani</span>
              <a href="#" target="_blank">mishaturani@gmail.com</a>
            </div>
            <div className="person">
              <span>Manning Ganier</span>
              <a href="#" target="_blank">manninganier@hotmail.com</a>
            </div>
            <div className="person">
              <span>Manning Ganier</span>
              <a href="#" target="_blank">manninganier@hotmail.com</a>
            </div>
            <div className="person">
              <span>Cornelious Trump</span>
              <a href="#" target="_blank">corneliousmanning@gmail.com</a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

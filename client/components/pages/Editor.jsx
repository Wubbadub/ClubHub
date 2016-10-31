import React, {PureComponent, PropTypes} from 'react'
import EditorSection from 'parts/EditorSection'

export default class Editor extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      sectionStates: this.makeSiteSections()
    }
  }

  static propTypes = {
    route: PropTypes.object
  }

  makeSiteSections = () => {
    const sections = {}
    for (const sectionTitle in this.props.route.site.sections){
      sections[sectionTitle] = false
    }
    return sections
  }

  toggleSection = (s) => {
    const sections = this.state.sectionStates
    sections[s] = !sections[s]
    this.setState({sectionStates: sections})
    this.forceUpdate()
  }

  render() {
    return (
      <div id="editor-container" className="col-3" >
        <div className="accordion">
          {Object.keys(this.state.sectionStates).map((s) => {
            return (
              <EditorSection section={s} active={this.state.sectionStates[s]} setActive={this.toggleSection} />
              )
          })}
        </div>
      </div>
    )
  }
}

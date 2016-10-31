import React, {PureComponent, PropTypes} from 'react'
import EditorSection from 'parts/EditorSection'

export default class Editor extends PureComponent {
  constructor(props) {
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
    for (const sectionTitle in this.props.route.site.sections) {
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
      <div className="editor container">
        <div className="columns">
          <div className="editor-bar col-3">
            <div className="accordion">
              {Object.keys(this.state.sectionStates).map((s) => {
                if (!this.props.route.site.sections[s].editor) return
                return (
                  <EditorSection key={s} section={s} title={this.props.route.site.sections[s].editor} active={this.state.sectionStates[s]} setActive={this.toggleSection} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

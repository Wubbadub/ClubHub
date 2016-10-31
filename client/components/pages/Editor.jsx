import React, {PureComponent, PropTypes} from 'react'
import EditorSection from 'parts/EditorSection'

export default class Editor extends PureComponent{
  constructor(props){
    super(props)
    this.state = {
      isSectionActive: this.activateAllSections(this.props.route.site.sections)
    }
  }

  static propTypes = {
    route: PropTypes.object
  }

  getSiteSections = () => {
    const sections = []
    for (const sectionTitle in this.props.route.site.sections){
      sections.push(sectionTitle)
    }
    return sections
  }

  toggleShow = (section) => {
    return (() => {
      this.setState({isSectionActive: {section: !this.state.isSectionActive[section]} })
    })
  }

  activateAllSections = (sections) => {
    const isSectionActive = {}
    for (const section in sections){
      if (sections.hasOwnProperty(section)){
        isSectionActive[section] = true
      }
    }
    return isSectionActive
  }

  render() {
    return (
      <div id="editor-container" className="col-3" >
        {
          (this.getSiteSections()).map((section) => {
            return (<EditorSection section={section} active={this.state.isSectionActive[section]} toggleShowSection={this.toggleShow(section)} />)
          })
        }
      </div>
    )
  }
}

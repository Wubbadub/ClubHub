import React, {Component, PropTypes} from 'react'
import Iframe from 'react-iframe'

import Config from 'Config'

import Icon from 'parts/Icon'

import Editable from 'pages/editor/Editable'
import TextForm from 'pages/editor/forms/TextForm'

export default class Meeting extends Component{
  constructor(props){
    super(props)
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    editor: PropTypes.object
  }

  render() {
    const {editor, data} = this.props
    const edit = editor !== null
    return (
      <section className="responsive-column">
          <div className="main-container-text">
              <h1>When and Where</h1>
              <Editable edit={edit} form={<TextForm label="Meeting Description" editor={editor} section="meeting" name="description" long={true}/>}>
                <p>
                  {data.description ? <span>{data.description}</span>: <span>&nbsp;</span>}
                </p>
              </Editable>
              <p className="stats">
                  <Icon icon="clock"/>&nbsp;
                  {data.day} at {data.time}
              </p>
              <Editable edit={edit} form={<TextForm label="Meeting Location" editor={editor} section="meeting" name="place"/>}>
                <p className="stats">
                  {data.place ? <span><Icon icon="placepin"/>&nbsp;{data.place}</span>: <span>&nbsp;</span>}
                </p>
              </Editable>
          </div>
          {data.place ?
          <div className="meeting-map">
            <div className="maps-iframe">
              <Iframe
                url={`https://www.google.com/maps/embed/v1/place?key=${Config.google_maps_client_id}&q=${data.place.replace(' ', '+')}`}
                width="100%" height="100%" frameborder="0"/>
              </div>
          </div>
          : null}
      </section>
    )
  }
}

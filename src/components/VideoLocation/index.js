import React, { PureComponent } from 'react'
import { object, func } from 'prop-types'
import { DropdownButton, MenuItem } from 'react-bootstrap'

import locationSvg from './location.svg'

class VideoLocation extends PureComponent {
  static propTypes = {
    videos: object.isRequired,
    video: object.isRequired,
    onSelect: func.isRequired,
  }

  render() {
    const { videos, video, onSelect } = this.props
    const videosIds = Object.keys(videos)
    const types = videosIds.map(id => videos[id].accessibilityLabel).sort()
    const uniqTypes = []

    types.forEach(type => {
      if (uniqTypes.indexOf(type) === -1) {
        uniqTypes.push(type)
      }
    })

    const buttonDom = (
      <span>
        <img className="icon" src={locationSvg} alt="" />
        {video.accessibilityLabel} - <span className="video-time" > {video.timeOfDay}</span >
      </span>
    )

    const menuItems = []

    uniqTypes.forEach(type => {
      const videosIdsByType = videosIds.filter(id => videos[id].accessibilityLabel === type)

      menuItems.push(<MenuItem key={type} header>{type}</MenuItem>)
      menuItems.push(videosIdsByType.map((id, index) => (
        <MenuItem
          key={id}
          eventKey={id}
          active={video.id === id}
          onSelect={onSelect}
        >
          {`${index + 1} -- ${videos[id].timeOfDay}`}
        </MenuItem>
      )))
      menuItems.push(<MenuItem key={`${type}-divider`} divider />)
    })

    return (
      <div className="video-location">
        <DropdownButton
          dropup
          title={buttonDom}
          id="video-location__btn"
          className="video-location__btn"
        >
          {menuItems}
        </DropdownButton>
      </div>
    )
  }
}

export default VideoLocation

import React, { PureComponent } from 'react'
import { array, object } from 'prop-types'

import locationSvg from './location.svg'

class VideoLocation extends PureComponent {
  static propTypes = {
    videos: array.isRequired,
    video: object.isRequired,
  }

  state = {
    listVisibility: false,
  }

  handleLocationFocus = () => {
    this.setState({
      listVisibility: true,
    })
  }

  handleLocationBlur = () => {
    this.setState({
      listVisibility: false,
    })
  }

  render() {
    const { videos, video } = this.props
    const { listVisibility } = this.state
    return (
      <div className="video-location">
        {listVisibility &&
          <ul className="video-list">
            {videos.map(v => (
              <li key={v.id}>{v.accessibilityLabel} - <span className="video-time">{v.timeOfDay}</span></li>
            ))}
          </ul>}
        <button
          className="video-location__cur"
          onFocus={this.handleLocationFocus}
          onBlur={this.handleLocationBlur}
        >
          <img className="icon" src={locationSvg} alt="" />
          {video.accessibilityLabel} - <span className="video-time">{video.timeOfDay}</span>
        </button>
      </div>
    )
  }
}

export default VideoLocation

import React, { PureComponent } from 'react'

import entries from './constants/entries.json'
import locationSvg from './assets/location.svg'

const randomIndex = Math.floor(Math.random() * entries.length)

class App extends PureComponent {
  state = {
    videos: entries || [],
    current: randomIndex || 0,
  }

  render() {
    const { current, videos } = this.state
    const video = videos[current]

    return (
      <div className="app-hero">
        <div className="video-container">
          <video autoPlay loop preload="auto">
            <track kind="captions" />
            <source src={video.url} type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
          </video>
          <div className="video-info">
            <div className="video-location">
              <img className="icon" src={locationSvg} alt="" />
              {video.accessibilityLabel} - <span className="video-time">{video.timeOfDay}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

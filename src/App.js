import React, { PureComponent } from 'react'

import entries from './constants/entries.json'
import locationSvg from './assets/location.svg'

const sortedEntries = entries.sort(
  (a, b) => {
    const nameA = a.accessibilityLabel.toLowerCase()
    const nameB = b.accessibilityLabel.toLowerCase()

    if (nameA < nameB) {
      return -1
    }

    if (nameA > nameB) {
      return 1
    }

    return 0
  },
)
const randomIndex = Math.floor(Math.random() * sortedEntries.length)

class App extends PureComponent {
  state = {
    listVisibility: false,
    videos: sortedEntries || [],
    current: randomIndex || 0,
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
    const { current, videos, listVisibility } = this.state
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
              {listVisibility && <ul className="video-list">
                {videos.map(v => (
                  <li key={v.id}>{v.accessibilityLabel} - <span className="video-time">{v.timeOfDay}</span></li>
                ))}
              </ul>}
              <div
                tabindex="0"
                className="video-location__cur"
                onFocus={this.handleLocationFocus}
                onBlur={this.handleLocationBlur}
              >
                <img className="icon" src={locationSvg} alt="" />
                {video.accessibilityLabel} - <span className="video-time">{video.timeOfDay}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

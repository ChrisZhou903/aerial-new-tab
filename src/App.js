import React, { PureComponent } from 'react'

import VideoPlayer from './components/VideoPlayer'
import VideoLocation from './components/VideoLocation'
import entries from './constants/entries.json'

const videosObj = entries.reduce((obj, v) => ({
  ...obj,
  [v.id]: {
    ...v,
  },
}), {})

const videosIds = entries.map(v => v.id)

const randomId = entries[Math.floor(Math.random() * videosIds.length)].id
const videoId = window.localStorage.getItem('videoId') || randomId


class App extends PureComponent {
  state = {
    videos: videosObj,
    current: videoId,
  }

  handleLocationSelect = id => {
    this.setState({
      current: id,
    })
  }

  render() {
    const { current, videos } = this.state
    const video = videos[current]

    return (
      <div className="app-hero">
        <div className="video-container">
          <VideoPlayer video={video} />
          <div className="video-info">
            <VideoLocation videos={videos} video={video} onSelect={this.handleLocationSelect} />
          </div>
        </div>
      </div>
    )
  }
}

export default App

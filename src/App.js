import React, { PureComponent } from 'react'

import VideoPlayer from './components/VideoPlayer'
import VideoLocation from './components/VideoLocation'
import entries from './constants/entries.json'

const sortedEntries = entries.sort((a, b) => {
  const nameA = a.accessibilityLabel.toLowerCase()
  const nameB = b.accessibilityLabel.toLowerCase()

  if (nameA < nameB) {
    return -1
  }

  if (nameA > nameB) {
    return 1
  }

  return 0
})

const randomIndex = Math.floor(Math.random() * sortedEntries.length)

class App extends PureComponent {
  state = {
    videos: sortedEntries || [],
    current: randomIndex || 0,
  }

  render() {
    const { current, videos } = this.state
    const video = videos[current]

    return (
      <div className="app-hero">
        <div className="video-container">
          <VideoPlayer video={video} />
          <div className="video-info">
            <VideoLocation videos={videos} video={video} />
          </div>
        </div>
      </div>
    )
  }
}

export default App

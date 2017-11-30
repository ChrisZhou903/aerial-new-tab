import React, { PureComponent } from 'react'

import VideoPlayer from './components/VideoPlayer'
import VideoLocation from './components/VideoLocation'
import Settings from './components/Settings'
import Info from './components/Info'
import DEFAULT_ENTRIES from './constants/entries.json'

const flatten = (array = []) => array.map(set => set.assets)
  .reduce((arr, item) => [...arr, ...item], [])

class App extends PureComponent {
  state = {
    videos: {},
    current: '',
  }

  componentDidMount() {
    fetch('http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/entries.json')
      .then(response => response.json()
        .then(json => {
          if (!response.ok) {
            return Promise.reject(json)
          }

          return json
        }),
      ).then(json => {
        this.updateStateByEntries(json)
      }, () => {
        this.updateStateByEntries(DEFAULT_ENTRIES)
      })
  }

  updateStateByEntries = data => {
    const entries = flatten(data)

    if (entries.length > 0) {
      const randomId = entries[Math.floor(Math.random() * entries.length)].id
      const current = window.localStorage.getItem('videoId') || randomId
      const videos = entries.reduce((obj, v) => ({
        ...obj,
        [v.id]: {
          ...v,
        },
      }), {})

      this.setState({
        videos,
        current,
      })
    }
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
          {video && <VideoPlayer video={video} />}
          <div className="video-info">
            {video &&
              <VideoLocation videos={videos} video={video} onSelect={this.handleLocationSelect} />}
            <div className="video-info__right">
              <Settings />
              <Info />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App

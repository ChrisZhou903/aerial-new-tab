import React, { PureComponent } from 'react'
import { object } from 'prop-types'

import playSvg from './play.svg'
import pauseSvg from './pause.svg'

class VideoPlayer extends PureComponent {
  static propTypes = {
    video: object.isRequired,
  }

  state = {
    isPlaying: false,
  }

  handlePlayClick = () => {
    this.video.play()
  }

  handlePauseClick = () => {
    this.video.pause()
  }

  handlePlaying = () => {
    this.setState({
      isPlaying: true,
    })
  }

  handlePause = () => {
    this.setState({
      isPlaying: false,
    })
  }

  render() {
    const { video } = this.props
    const { isPlaying } = this.state

    return (
      <div>
        <video
          loop
          preload="false"
          onPlaying={this.handlePlaying}
          onPause={this.handlePause}
          ref={v => { this.video = v }}
        >
          <track kind="captions" />
          <source src={video.url} type="video/mp4" />Your browser does not support the video tag. I suggest you upgrade your browser.
        </video>
        {isPlaying ?
          <button
            className="video-btn pause-btn"
            onClick={this.handlePauseClick}
          >
            <img src={pauseSvg} alt="" />
          </button> :
          <button
            className="video-btn play-btn"
            onClick={this.handlePlayClick}
          >
            <img src={playSvg} alt="" />
          </button>
        }
      </div>
    )
  }
}

export default VideoPlayer

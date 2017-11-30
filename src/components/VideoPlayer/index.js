import React, { PureComponent } from 'react'
import { object } from 'prop-types'

import playSvg from './play.svg'
import pauseSvg from './pause.svg'
import loadingSvg from './loading.svg'

class VideoPlayer extends PureComponent {
  static propTypes = {
    video: object.isRequired,
  }

  state = {
    isLoading: false,
    isPlaying: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.video.id !== this.props.video.id) {
      this.setPlaying(false)
      this.setState({
        isLoading: true,
      })
    }
  }

  setPlaying = isPlaying => {
    this.setState({
      isPlaying,
    })
  }

  handlePlayClick = () => {
    this.video.play()
  }

  handlePauseClick = () => {
    this.video.pause()
  }

  handleWaiting = () => {
    this.setState({
      isLoading: true,
    })
  }

  handleCanPlay = () => {
    const { video } = this.props

    this.setState({
      isLoading: false,
    })
    window.localStorage.setItem('videoId', video.id)
  }

  handlePlay = () => {
    this.setPlaying(true)
  }

  handlePause = () => {
    this.setPlaying(false)
  }

  handleError = () => {
    this.setPlaying(false)
  }

  render() {
    const { video } = this.props
    const { isPlaying, isLoading } = this.state
    const playBtn = !isLoading && (
      <button
        className="video-btn play-btn"
        onClick={this.handlePlayClick}
      >
        <img src={playSvg} alt="" />
      </button>
    )
    const pauseBtn = (
      <button
        className="video-btn pause-btn"
        onClick={this.handlePauseClick}
      >
        <img src={pauseSvg} alt="" />
      </button>
    )

    return (
      <div>
        <video // eslint-disable-line
          loop
          onWaiting={this.handleWaiting}
          onCanPlay={this.handleCanPlay}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onError={this.handleError}
          ref={v => { this.video = v }}
          src={video.url}
        />
        {isPlaying ? pauseBtn : playBtn}
        {isLoading &&
          <div className="video-loading">
            <img src={loadingSvg} alt="" />
          </div>
        }
      </div>
    )
  }
}

export default VideoPlayer

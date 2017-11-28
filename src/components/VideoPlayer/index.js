import React, { PureComponent } from 'react'
import { object } from 'prop-types'

import playSvg from './play.svg'
import pauseSvg from './pause.svg'

class VideoPlayer extends PureComponent {
  static propTypes = {
    video: object.isRequired,
  }

  state = {
    canPlay: false,
    isPlaying: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.video.id !== this.props.video.id) {
      this.setPlaying(false)
      this.setState({
        canPlay: false,
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

  handleCanPlay = () => {
    const { video } = this.props

    this.setState({
      canPlay: true,
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
    const { canPlay, isPlaying } = this.state
    const controlBtn = isPlaying ?
      (
        <button
          className="video-btn pause-btn"
          onClick={this.handlePauseClick}
        >
          <img src={pauseSvg} alt="" />
        </button>
      ) :
      (
        <button
          className="video-btn play-btn"
          onClick={this.handlePlayClick}
        >
          <img src={playSvg} alt="" />
        </button>
      )

    return (
      <div>
        <video // eslint-disable-line
          loop
          onCanPlay={this.handleCanPlay}
          onPlay={this.handlePlay}
          onPause={this.handlePause}
          onError={this.handleError}
          ref={v => { this.video = v }}
          src={video.url}
        />
        {canPlay && controlBtn}
      </div>
    )
  }
}

export default VideoPlayer

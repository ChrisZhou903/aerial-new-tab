import React from 'react'
import { Popover, OverlayTrigger } from 'react-bootstrap'

import infoSvg from './info.svg'

const overlay = (
  <Popover id="info-popover-trigger">
    Aerial Videos are from <strong>Apple TV Screen Savers</strong>.
  </Popover>
)

const Info = () => (
  <OverlayTrigger trigger="focus" placement="top" overlay={overlay}>
    <button className="video-info__btn"><img className="icon" src={infoSvg} alt="" /> Info</button>
  </OverlayTrigger>
)

export default Info

import React, { PureComponent } from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

import settingsSvg from './settings.svg'
import newTabSvg from './newTab.svg'
import appSvg from './app.svg'

const title = (
  <span>
    <img className="icon" src={settingsSvg} alt="" />
    Settings
  </span>
)

const { chrome } = window

class Settings extends PureComponent {
  handleAppTabClick = () => {
    chrome.tabs && chrome.tabs.update({
      url: 'chrome://apps/',
      active: true,
      selected: true,
    })
  }

  handleDefaultNewTabClick = () => {
    chrome.tabs && chrome.tabs.update({
      url: 'chrome-search://local-ntp/local-ntp.html',
      active: true,
      selected: true,
    })
  }

  render() {
    return (
      <div className="app-settings">
        <DropdownButton
          dropup
          pullRight
          title={title}
          id="app-settings"
          className="video-info__btn app-settings__btn"
        >
          <MenuItem onSelect={this.handleAppTabClick}>
            <img className="icon" src={appSvg} alt="" /> Show Apps
          </MenuItem>
          <MenuItem onSelect={this.handleDefaultNewTabClick}>
            <img className="icon" src={newTabSvg} alt="" /> Open Default Tab
          </MenuItem>
        </DropdownButton>
      </div>
    )
  }
}

export default Settings

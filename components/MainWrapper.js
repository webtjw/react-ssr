import React, {Component} from 'react'
import Topbar from './Topbar'

class MainWrapper extends Component {
  render () {
    return <div id="app">
      <Topbar />
      {this.props.children}
    </div>
  }
}

export default MainWrapper
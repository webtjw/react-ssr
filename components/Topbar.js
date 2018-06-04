import React, {Component} from 'react'
import Link from 'next/link'
import './style/topbar.scss'

const topNavs = [
  {name: '首页', path: '/'},
  {name: '标签', path: '/tag'},
  {name: '归档', path: '/archive'},
  {name: '关于', path: '/about'},
]

class Topbar extends Component {
  render () {
    return <div id="topbar">
    <div className="wrapper">
      <div data-flex="dir:left cross:center">
        <Link href={'/login'}><img className="avatar pointer" src='/static/images/avatar.jpg' alt="Robin's avatar"/></Link>
        <nav className="a-r font-0">
          {
            topNavs.map(item => <Link href={item.path} key={item.path}><a>{item.name}</a></Link>)
          }
        </nav>
      </div>
    </div>
  </div>
  }
}

export default Topbar
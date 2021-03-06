import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import './style/topbar.less'

const topNavs = [
  {name: '首页', path: '/index'},
  {name: '文章', path: '/article'},
  {name: '标签', path: '/tag'},
  {name: '关于', path: '/about'},
]

class Topbar extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    developer: PropTypes.bool
  }

  getActiveIndex () {
    const {path} = this.props
    if (path.startsWith('/article')) return 2
    else if (path.startsWith('/tag')) return 3
    else if (path.startsWith('/about')) return 4
    else return 1
    return 1
  }
  
  render () {
    const {developer} = this.props
    const avatarLink = developer ? '/article/edit' : '/login'
    const activeIndex = this.getActiveIndex()

    return <div id="topbar">
    <div className="wrapper">
      <div data-flex="dir:left cross:center">
        <div data-flex-box="0" className="font-0">
          <Link href={avatarLink}><img className="avatar pointer" src='/nextStatic/images/kitty.jpg' alt="Robin"/></Link>
        </div>
        <nav className="a-r font-15" data-flex-box="1" data-flex="dir:left main:right cross:center">
          <Link href="/index" as="/"><a className={`nav-item c-333 relative ${activeIndex === 1 && 'active'}`}>首页</a></Link>
          <Link href="/article"><a className={`nav-item c-333 relative ${activeIndex === 2 && 'active'}`}>文章</a></Link>
          <Link href="/tag"><a className={`nav-item c-333 relative ${activeIndex === 3 && 'active'}`}>标签</a></Link>
          <Link href="/about"><a className={`nav-item c-333 relative ${activeIndex === 4 && 'active'}`}>关于</a></Link>
        </nav>
      </div>
    </div>
  </div>
  }
}

export default Topbar
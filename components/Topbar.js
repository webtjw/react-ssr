import React, {Component} from 'react'
import Link from 'next/link'
import './style/topbar.scss'

const topNavs = [
  {name: '首页', path: '/index'},
  {name: '文章', path: '/article'},
  {name: '标签', path: '/tag'},
  {name: '关于', path: '/about'},
]

class Topbar extends Component {
  render () {
    return <div id="topbar">
    <div className="wrapper">
      <div data-flex="dir:left cross:center">
        <div data-flex-box="0">
          <Link href={'/login'}><img className="avatar pointer" src='/static/images/avatar.jpg' alt="Robin"/></Link>
        </div>
        <nav className="a-r font-15" data-flex-box="1" data-flex="dir:left main:right cross:center">
          <Link href="/index" as="/"><a className="nav-item relative">首页</a></Link>
          <Link href="/article"><a className="nav-item relative">文章</a></Link>
          <Link href="/tag"><a className="nav-item relative">标签</a></Link>
          <Link href="/about"><a className="nav-item relative">关于</a></Link>
        </nav>
      </div>
    </div>
  </div>
  }
}

export default Topbar
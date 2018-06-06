import React, {Component} from 'react'
import Link from 'next/link'
import NextDocument from '../components/NextDocument'
import '../components/style/about.scss'

class About extends Component {
  render () {
    return <NextDocument title="关于 · Robin">
      <div className="about-page p-t-40">
        <p>Hi，我是 Robin，</p>
        <p>这是我的技术小站，如果你有任何疑问，请通过邮箱 <a href="mailto:webtjw@foxmail.com">webtjw@foxmail.com</a> 联系我。</p>
      </div>
    </NextDocument>
  }
}

export default About
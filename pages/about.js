import React, {Component} from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'
import '../components/style/about.scss'

class About extends Component {
  static async getInitialProps (context) {
    const {asPath, pathname, query} = context
    const props = {route: {path: asPath, query}}

    return props
  }

  render () {
    const {route} = this.props

    return <PageWrapper title="关于 · Robin" route={route}>
      <div className="about-page p-t-40">
        <p>Hi，我是 Robin，</p>
        <p>这是我的技术小站，如果你有任何疑问，请通过邮箱 <a href="mailto:webtjw@foxmail.com">webtjw@foxmail.com</a> 联系我。</p>
      </div>
    </PageWrapper>
  }
}

export default About
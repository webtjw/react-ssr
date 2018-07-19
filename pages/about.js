import React, {Component} from 'react'
import Link from 'next/link'
import PageWrapper from '../components/PageWrapper'

class About extends Component {
  static async getInitialProps (context) {
    const {asPath, pathname, query} = context
    const props = {route: {path: asPath, query}}

    return props
  }

  render () {
    const {route, developer} = this.props

    return <PageWrapper title="关于 · Robin" route={route} description="关于我" keyword="关于我,关于" developer={developer}>
      <div className="about-page p-t-40" style={{lineHeight: 1.6}}>
        <p className="m-v-10">Hi，我是 Robin，</p>
        <p className="m-v-10">这是我的技术小站，如果你有任何疑问，请通过邮箱 <a className="c-link underline" href="mailto:webtjw@foxmail.com">webtjw@foxmail.com</a> 联系我。</p>
      </div>
    </PageWrapper>
  }
}

export default About
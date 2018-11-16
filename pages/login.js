import React, {Component} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import PageWrapper from '../components/PageWrapper'
import RobinInput from '../components/common/RobinInput'
import {login} from '../request'

class Login extends Component {
  static async getInitialProps (context) {
    const {asPath, pathname, query} = context
    const props = {route: {path: asPath, query}}

    return props
  }

  constructor () {
    super()

    this.state = {
      token: ''
    }
  }

  async checkSubmit () {
    const {
      state: { token },
      props: { updateDeveloper },
    } = this
    if (token.trim()) {
      const result = await login(token)
      if (result && result.success) {
        const name = result.data
        updateDeveloper()
        alert(`欢迎登入，${name}`)
        Router.back()
      } else {
        alert(result.data)
      }
    } else {
      alert('请输入登入口令')
    }
  }

  render () {
    const value = this.state && this.state.token !== null ? this.state.token : ''
    const {route, developer} = this.props

    return <PageWrapper title="开发者登入" route={route} developer={developer}>
      <div className="login-page p-t-40 a-c">
        <h3 className="font-18 m-v-40">开发者入口</h3>
        <RobinInput
          valueHandle={val => this.setState({token: val})}
          value={value}
          type="password"
          label="开发者口令"
          placeholder="请输入你的开发者口令"
          onEnter={() => this.checkSubmit()} />
      </div>
    </PageWrapper>
  }
}

export default Login
import React, {Component} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import NextDocument from '../components/NextDocument'
import RobinInput from '../components/common/RobinInput'
import {login} from '../request'
import '../components/style/login.scss'

class Login extends Component {
  constructor () {
    super()

    this.state = {
      token: ''
    }
  }

  async checkSubmit () {
    const {token} = this.state
    if (typeof token === 'string' && token.trim()) {
      const result = await login(token)
      if (result && result.success && result.data) {
        alert(`欢迎登入，${result.data}`)
        Router.back()
      }
      else alert('登入失败')
    } else alert('请输入口令')
  }

  render () {
    const value = this.state && this.state.token !== null ? this.state.token : ''

    return <NextDocument title="开发者 · Robin">
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
    </NextDocument>
  }
}

export default Login
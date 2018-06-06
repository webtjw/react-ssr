import React, {Component} from 'react'
import Link from 'next/link'
import NextDocument from '../components/NextDocument'
import RobinInput from '../components/common/RobinInput'
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
      const result = await utils.login(token)
      if (result && result.success && result.data) {
        this.props.updateDeveloper(result.data)
        utils.addSideTip({text: `欢迎登入，${result.data}`, type: 'success'})
        this.props.history.go(-1)
      }
      else utils.addSideTip({text: '登入失败', type: 'error'})
    } else utils.addSideTip({text: '请输入口令', type: 'error'})
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
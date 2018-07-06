import React, {Component} from 'react'
import NextDocument from '../components/NextDocument'

export default class Blog extends Component {
  static async getInitialProps({asPath, query, req, res}) {
    // 首次初始化页面，该函数只会在服务端执行，会得到一个 context 传参
    // 当页面通过 Link 组件导航到另一个路由时，客户端的 getInitialProps 才会被执行，这时候会传一个路由信息对象，和 context 是不一样的，需要做区别对待
    const route = {path: asPath, query}
    return {route}
  }

  getMatchPage () {
    const {route} = this.props
    let title = '',
      component = null
    console.log(route)
    return {title, component}
  }

  render () {
    const {route} = this.props
    const matchPage = this.getMatchPage()
    const {title, component} =matchPage

    return <NextDocument title={title}>
      {component}
    </NextDocument>
  }
}

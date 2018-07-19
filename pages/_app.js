import App, {Container} from 'next/app'
import React from 'react'

export default class MyApp extends App {
  static async getInitialProps ({Component, router, ctx}) {
    let pageProps = {}
    if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx) // default
    
    return {
      pageProps,
      developer: ctx && ctx.req && ctx.req.headers.cookie && ctx.req.headers.cookie.indexOf('authentication') > -1
    }
  }

  constructor () {
    super()
    
    this.state = {
      developer: false
    }
  }


  componentDidMount () {
    this.setState({developer: this.props.developer})
  }
  render () {
    const developer = this.state ? this.state.developer : this.props.developer
    const {Component, pageProps} = this.props

    return <Container>
      <Component {...pageProps} developer={developer} updateDeveloper={() => this.setState({developer: true})} />
    </Container>
  }
}
import App, { Container } from 'next/app'
import React from 'react'
import { checkDeveloper } from '../request'

export default class MyApp extends App {
  static async getInitialProps ({Component, router, ctx}) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    
    return {
      pageProps,
      developer: false
    }
  }

  constructor () {
    super()
    
    this.state = {
      developer: false
    }
  }


  async checkPersistentToken () {
    const result = await checkDeveloper()
    this.setState({
      developer: result.success && result.data
    })
  }

  componentDidMount () {
    this.checkPersistentToken()
  }
  render () {
    const developer = this.state ? this.state.developer : this.props.developer
    const {Component, pageProps} = this.props

    return <Container>
      <Component {...pageProps} developer={developer} updateDeveloper={() => this.setState({developer: true})} />
    </Container>
  }
}
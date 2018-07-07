import React from 'react'

export default async function dispatchRoute (path) {
  let title = ''
  let component = null
  let description = ''
  let keyword = ''

  if (path === '/') {
    component = () => <div>index</div>
    title = 'index'
  } else {
    component = () => <div>else</div>
    title = 'else'
  }

  return {title, component, description, keyword}
}
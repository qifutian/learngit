import React, { Component } from 'react'
import AppleBox from './appleBox'
import AppleList from './appleList'

class App extends Component {
  render () {
    return (
      <div className="app">
        <AppleBox></AppleBox>
        <AppleList></AppleList>
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('apple')
@observer
class AppleBox extends Component {
  render () {
    const { normalApple, badApple } = this.props.apple
    return (
      <div className="apple-box">
        <h3 className="title">苹果篮子</h3>
        <div className="stats">
          <section className="section">
            <h4 className="head">当前</h4>
            <div className="content">
              { normalApple.length } 个苹果，{ normalApple.reduce((total, apple) => { return total += apple.weight }, 0) } 克
            </div>
          </section>
          <section className="section">
            <h4 className="head">已吃掉</h4>
            <div className="content">
              { badApple.length } 个苹果，{ badApple.reduce((total, apple) => { return total += apple.weight }, 0) } 克
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default AppleBox

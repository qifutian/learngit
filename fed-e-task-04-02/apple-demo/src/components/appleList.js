import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import img from "../images/apple.png"

@inject('apple')
@observer
class AppleList extends Component {
  render () {
    const { normalApple, appleAdd, appleEat, disabled } = this.props.apple
    return (
      <div className="apple-list">
        <div className="list">
          {
            normalApple.length === 0 ? (<div className="empty-tip">苹果篮子空空如也</div>) : normalApple.map((apple, index) => {
              return (
                <div key={index} className="apple-item">
                  <img className="apple" src={img} alt="apple-img" />
                  <div className="info">
                    <div className="name">红苹果 - { apple.number } 号</div>
                    <div className="weight">重量 { apple.weight } 克</div>
                  </div>
                  <div className="btn-div">
                    <button className="button" onClick={() => appleEat(index)}>吃掉</button>
                  </div>
                </div>
              )
            })
          }
        </div>
        <footer className="footer btn-div">
          <button className={ disabled ? 'disabled' : '' } disabled={disabled} onClick={appleAdd}>{disabled ? '正在采摘...' : '摘苹果'}</button>
        </footer>
      </div>
    )
  }
}

export default AppleList

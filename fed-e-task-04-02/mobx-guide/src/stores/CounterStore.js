import { observable, action, configure, runInAction, flow, computed, autorun } from 'mobx'
import axios from 'axios'

// 通过配置强制程序使用 action 函数更改应用程序中的状态
// 如果不使用 action 装饰器，则无法更改状态
configure({ enforceActions: 'observed' })

class Counter {
  constructor() {
    autorun(() => {
      try {
        uniqueUsername(this.username)
        console.log('用户名可用')
      } catch (e) {
        console.log(e.message)
      }
    }, { delay: 2000 })
  }
  

  @observable count = 0
  @observable users = []
  @observable username = 'test'

  @action.bound increment () {
    this.count = this.count + 1
  }

  @action.bound decrement () {
    this.count = this.count - 1
  }

  // @action.bound async getData () {
  //   let { data } = await axios.get('https://api.github.com/users')
  //   runInAction(() => this.users = data)
  // }

  getData = flow(function* () {
    let { data } = yield axios.get('https://api.github.com/users')
    this.users = data
  }).bind(this)

  @computed get getResult () {
    return this.count * 10
  }

  @action.bound changeUsername (username) {
    this.username = username
  }
}

function uniqueUsername (username) {
  return new Promise((resolve, reject) => {
    if (username === 'admin') {
      reject('用户名不可用')
    } else {
      resolve('用户名可用')
    }
  })
}

const counter = new Counter()

export default counter

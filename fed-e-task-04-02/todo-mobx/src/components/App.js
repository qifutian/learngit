import React, { Component } from 'react'
import AddTodo from './addTodo'
import TodoExtra from './todoExtra'
import TodoList from './todoList'

class App extends Component {
  render () {
    return (
      <section className="todoapp">
        <AddTodo />
        <TodoList />
        <TodoExtra />
      </section>
    )
  }
}

export default App;

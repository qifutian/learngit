import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('todo')
@observer
class TodoExtra extends Component {
  render () {
    const { unfinishedTodoCount, condition, changeCondition, clearCompleted } = this.props.todo
    return (
      <footer className="footer">
				<span className="todo-count"><strong>{ unfinishedTodoCount }</strong> item left</span>
				<ul className="filters">
					<li>
						<button className={condition === 'All' ? 'selected' : ''} onClick={() => changeCondition('All')}>All</button>
					</li>
					<li>
						<button className={condition === 'Active' ? 'selected' : ''} onClick={() => changeCondition('Active')}>Active</button>
					</li>
					<li>
						<button className={condition === 'Completed' ? 'selected' : ''} onClick={() => changeCondition('Completed')}>Completed</button>
					</li>
				</ul>
				
				<button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
			</footer>
    )
  }
}

export default TodoExtra

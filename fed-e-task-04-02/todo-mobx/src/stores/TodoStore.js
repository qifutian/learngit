import { action, computed, observable } from "mobx"

class TodoStore {
  @observable todos = []
  @observable condition = 'All'

  @action.bound todoAdd (taskName) {
    this.todos.push({
      taskName,
      isCompleted: false
    })
  }

  @action.bound todoDelete (index) {
    this.todos.splice(index, 1)
  }

  @action.bound todoChangeStatus (index, state) {
    this.todos[index].isCompleted = state
  }

  @computed get unfinishedTodoCount () {
    return this.todos.filter(todo => !todo.isCompleted).length
  }

  @action.bound changeCondition (condition) {
    this.condition = condition
  }

  @computed get filterTodo () {
    switch (this.condition) {
      case 'All':
        return this.todos
      case 'Active':
        return this.todos.filter(todo => !todo.isCompleted)
      case 'Completed':
        return this.todos.filter(todo => todo.isCompleted)
    }
  }

  @action.bound clearCompleted () {
    this.todos = this.todos.filter(todo => !todo.isCompleted)
  }
}

const todo = new TodoStore()

export default todo

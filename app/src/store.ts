import Vue from 'vue'
import Vuex from 'vuex'
import {Todo} from "./data/todo";

Vue.use(Vuex);

export interface Store {
  todos: Todo[]
}

export default new Vuex.Store<Store>({
  state: {
    todos: []
  },
  mutations: {
    commitNewTodo: (state, payload: Todo) => {
      state.todos.push(payload)
    },
    commitUpdateTodo: (state, payload: Todo) => {
      const todos = [... state.todos]
      const index = todos.findIndex((todo) => todo.title === payload.title);
      todos[index] = {
        ...todos[index],
        ...payload,
      }
      state.todos = todos
    },
    commitRemoveTodo: (state, payload: Todo) => {
      const todos = [...state.todos];
      const index = todos.findIndex((todo) => todo.title === payload.title);
      todos.splice(index, 1);
      state.todos = todos;
    }
  },

  getters: {
    getAllTodos: (state) => state.todos,
    doneTodos: (state) => {
      return state.todos.filter(todo => todo.completed)
    },
    futureTodos: (state) => {
      return state.todos.filter(todo => !todo.completed)
    }
  },

  actions: {
    dispatchAddNewTodo: (context, payload: Todo) => {
      context.commit('commitNewTodo', payload)
    },
    dispatchAddInitialTodos: (context, payload: Array<Todo>) => {
      payload.forEach((todo)=> {
        context.dispatch('dispatchAddNewTodo', todo);
      })
    },
    dispatchEditTodo: (context, payload: Todo) => {
      context.commit('commitUpdateTodo', payload)
    },
    dispatchRemoveTodo: (context, payload: Todo) => {
      context.commit('commitRemoveTodo', payload)
    }
  }
})

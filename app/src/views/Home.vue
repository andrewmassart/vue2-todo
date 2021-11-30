<template>
  <div class="home">
    <h1>My Todos</h1>
    <add-todo />
    <div v-for="todo in ongoingTodos" :key="todo.title">
      <todo-item
        :title="todo.title"
        :date="todo.date"
        :color="todo.color"
        :completed="todo.completed"
      />
    </div>
    <h1>Done</h1>
    <div v-for="todo in completedTodos" :key="todo.title">
      <todo-item
        :title="todo.title"
        :date="todo.date"
        :color="todo.color"
        :completed="todo.completed"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Todo } from "../data/todo";
import AddTodo from "../components/AddTodo.vue";
import TodoItem from "../components/TodoItem.vue";
import store from "../store";

@Component({
  components: {
    TodoItem,
    AddTodo,
  },
})
export default class Home extends Vue {
  private initialTodos: Array<Todo> = [
    {
      title: "Grocery shopping",
      date: "20/08/2018",
      color: "orange",
      completed: false,
    },
    {
      title: "Go to the beach",
      date: "11/08/2018",
      color: "blue",
      completed: true,
    },
    {
      title: "Call grandma",
      date: "01/09/2018",
      color: "green",
      completed: false,
    },
  ];

  created() {
    store.dispatch("dispatchAddInitialTodos", this.initialTodos);
  }

  get completedTodos() {
    return store.getters.doneTodos;
  }

  get ongoingTodos() {
    return store.getters.futureTodos;
  }
}
</script>

<style lang="scss" scoped>
</style>

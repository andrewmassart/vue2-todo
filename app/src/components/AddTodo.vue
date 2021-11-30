<template>
  <div class="todo">
    <form>
      <div class="add">
        <input type="text" v-model="title" placeholder="+ add new" required />

        <div class="colors">
          <span class="dot orange" @click="handleSubmit('orange')"></span>
          <span class="dot red" @click="handleSubmit('red')"></span>
          <span class="dot blue" @click="handleSubmit('blue')"></span>
          <span class="dot green" @click="handleSubmit('green')"></span>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Todo } from "../data/todo";
import store from "../store";

@Component({})
export default class AddTodo extends Vue {
  private title: string = "";

  public getDate(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");

    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }

  public handleSubmit(color: string) {
    let newTodo: Todo = {
      title: this.title,
      date: this.getDate(),
      color: color,
      completed: false,
    };

    store.dispatch("dispatchAddNewTodo", newTodo);
    this.title = "";
  }
}
</script>

<style>
.add {
  display: flex;
  text-align: center;
  align-content: center;
  justify-content: space-between;
  width: 100%;
}

.colors {
  display: flex;
  padding: 0.75rem;
}

.dot {
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  display: inline-block;
  padding: 0.5rem;
  margin: 0 0.2rem;
}

.dot:hover {
  cursor: pointer;
  opacity: 0.7;
}

input[type="text"] {
  width: 50%;
  background: rgba(246, 246, 246, 0.9);
  border: none;
  font-size: 16px;
  border-radius: 1.75rem;
  padding-left: 1.25rem;
}
.red {
  background-color: red;
}

.green {
  background-color: green;
}

.orange {
  background-color: orange;
}

.blue {
  background-color: blue;
}
.todo {
  display: flex;
  text-align: center;
  align-content: center;
  justify-content: space-between;
  background-color: rgba(246, 246, 246, 0.9);
  margin: 1.5rem 0;
  border-radius: 1.75rem;
  flex-direction: column;
}
</style>

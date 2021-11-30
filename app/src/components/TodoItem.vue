<template>
  <div
    class="todo-item"
    :class="{ done: completed }"
    @dblclick="handleDblclick"
  >
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="color-date">
      <h3>{{ date }}</h3>
      <div class="check-box" :style="cssVar">
        <span
          @click="todoToEdit()"
          class="material-icons"
          :class="{ complete: completed }"
        >
          check
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "../store";

@Component({
  props: {
    title: String,
    date: String,
    color: String,
    completed: Boolean,
  },
})
export default class TodoItem extends Vue {
  get cssVar() {
    return { "--color": this.$props.color };
  }

  handleDblclick() {
    if (this.$props.completed) {
      store.dispatch("dispatchRemoveTodo", this.$props);
    }
  }

  todoToEdit() {
    store.dispatch("dispatchEditTodo", {
      ...this.$props,
      completed: !this.$props.completed,
    });
  }
}
</script>

<style lang="scss" scoped>
h3 {
  margin: 1rem;
}

.check-box {
  background-color: var(--color);
  color: var(--color);
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 33%;
  cursor: pointer;
}

.done {
  opacity: 0.4;
}

.todo-item {
  display: flex;
  text-align: center;
  align-content: center;
  justify-content: space-between;
  background-color: rgba(246, 246, 246, 0.9);
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  padding-right: 0.5rem;
}

.todo-item:hover {
  opacity: 0.6;
}

.color-date {
  display: flex;
  align-items: center;
}

span.material-icons.complete {
  color: white;
  padding-top: 0.25rem;
  font-size: 1.75rem;
}
</style>

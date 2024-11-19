<template>
  <div>
    <ul>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
      />
    </ul>
    <button @click="clearCompleted">Удалить завершенные</button>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  components: { TodoItem },
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleTodo(id) {
      this.$emit("toggleTodo", id);
    },
    clearCompleted() {
      this.$emit("clearCompleted");
    },
  },
};
</script>

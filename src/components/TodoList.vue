<template>
  <div class="todo-list">
    <ul class="todo-list-ul">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @deleteTodo="deleteTodo"
      />
    </ul>
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
    deleteTodo(id) {
      this.$store.commit("deleteTodo", id);
    },
  },
};
</script>

<style scoped>
.todo-list {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  background: #fff;
  min-width: 100%;
}
.todo-list-ul {
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0;
  margin: 0;
}
.todo-list__button {
  width: 100px;
  height: 60px;
}
</style>
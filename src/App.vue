<template>
  <div class="todo-main">
    <div class="todo-main-container">
      <h1 class="todo-main__title">TodoApp</h1>
      <TodoList
        :todos="filteredTodos"
        @toggleTodo="toggleTodo"
      />
      <TodoFilters
        @clearCompleted="clearCompleted"
        :filter="filter"
        :remaining="remainingTodos"
        @setFilter="setFilter"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import TodoFilters from "./components/TodoFilters";
import TodoList from "./components/TodoList";

export default {
  components: { TodoFilters, TodoList },
  computed: {
    ...mapState(["filter"]),
    ...mapGetters(["filteredTodos", "remainingTodos"]),
  },
  methods: {
    ...mapActions(["fetchTodos"]),
    setFilter(filter) {
      this.$store.commit("setFilter", filter);
    },
    toggleTodo(id) {
      this.$store.commit("toggleTodo", id);
    },
    clearCompleted() {
      this.$store.commit("clearCompleted");
    },
  },
  created() {
    this.fetchTodos();
  },
};
</script>

<style scoped>
.todo-main {
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  display: flex;
  justify-content: center;
}
.todo-main-container {
  background: #f5f5f5;
  padding: 30px;
  min-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.todo-main__title {
  font-size: 36px;
  margin: 10px 0;
}
</style>
<template>
  <div class="todo-main">
    <div class="todo-main-container">
      <h1 class="todo-main__title">TodoApp</h1>
      <!-- Компонент для создания новой тудушки -->
      <TodoCreate />
      <!-- Компонент для отображения списка тудушек -->
      <TodoList
        :todos="filteredTodos"
        @toggleTodo="toggleTodo"
      />
      <!-- Компонент для фильтрации и управления тудушками -->
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
import TodoCreate from "./components/TodoCreate";

export default {
  components: { TodoFilters, TodoList, TodoCreate },

  computed: {
    /**
     * Текущий выбранный фильтр для отображения тудушек.
     * @type {"all" | "active" | "completed"}
     */
    ...mapState(["filter"]),

    /**
     * Список тудушек, отфильтрованных согласно текущему фильтру.
     * @type {Todo[]}
     */
    ...mapGetters(["filteredTodos"]),

    /**
     * Количество невыполненных тудушек.
     * @type {number}
     */
    ...mapGetters(["remainingTodos"]),
  },

  methods: {
    /**
     * Загружает тудушки с сервера.
     * @returns {Promise<void>}
     */
    ...mapActions(["fetchTodos"]),

    /**
     * Устанавливает новый фильтр для отображения тудушек.
     * @param {"all" | "active" | "completed"} filter - Новый фильтр.
     */
    setFilter(filter) {
      this.$store.commit("setFilter", filter);
    },

    /**
     * Переключает статус выполнения тудушки.
     * @param {number} id - ID тудушки.
     */
    toggleTodo(id) {
      this.$store.commit("toggleTodo", id);
    },

    /**
     * Удаляет все выполненные тудушки.
     */
    clearCompleted() {
      this.$store.commit("clearCompleted");
    },
  },

  created() {
    /**
     * Вызывается при создании компонента. Загружает начальные данные.
     */
    this.fetchTodos();
  },
};
</script>

<style scoped>
/* Основные стили приложения */
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

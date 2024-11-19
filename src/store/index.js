import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
    filter: "all", // all | active | completed
    status: "idle", // idle | loading | error | success
    error: null,
  },
  mutations: {
    setTodos(state, todos) {
      state.todos = todos;
    },
    setFilter(state, filter) {
      state.filter = filter;
    },
    setStatus(state, status) {
      state.status = status;
    },
    setError(state, error) {
      state.error = error;
    },
    toggleTodo(state, id) {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) todo.completed = !todo.completed;
    },
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id); // Также добавляем удаление тудушки через filter
    },
    editTodo(state, { id, newTitle }) {
      const todo = state.todos.find((todo) => todo.id === id); // Тудушку которую находим через редактирование находим через find
      if (todo) {
        todo.title = newTitle; // Даём тудушке новый текст, меняем содержимое 
      }
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      commit("setStatus", "loading");
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1/todos"
        );
        if (!response.ok) throw new Error("Ошибка загрузки данных");
        const todos = await response.json();
        commit("setTodos", todos.slice(0, 5));
        commit("setStatus", "success");
      } catch (error) {
        commit("setError", error.message);
        commit("setStatus", "error");
      }
    },
    editTodo({ commit }, { id, newTitle }) {
      commit("editTodo", { id, newTitle });
    },
  },
  getters: {
    filteredTodos(state) {
      switch (state.filter) {
        case "active":
          return state.todos.filter((todo) => !todo.completed);
        case "completed":
          return state.todos.filter((todo) => todo.completed);
        default:
          return state.todos;
      }
    },
    remainingTodos(state) {
      return state.todos.filter((todo) => !todo.completed).length;
    },
  },
});

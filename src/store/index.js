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

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

/**
 * @typedef {Object} Todo
 * @property {number} id - Уникальный идентификатор тудушки.
 * @property {string} title - Название или текст тудушки.
 * @property {boolean} completed - Статус выполнения тудушки.
 */

/**
 * Vuex-хранилище для управления состоянием тудушек.
 */
export default new Vuex.Store({
  state: {
    /**
     * Список тудушек.
     * @type {Todo[]}
     */
    todos: [],

    /**
     * Текущий фильтр.
     * @type {"all" | "active" | "completed"}
     */
    filter: "all",

    /**
     * Статус загрузки данных.
     * @type {"idle" | "loading" | "error" | "success"}
     */
    status: "idle",

    /**
     * Сообщение об ошибке.
     * @type {string | null}
     */
    error: null,
  },
  mutations: {
    /**
     * Устанавливает список тудушек.
     * @param {Object} state - Текущее состояние Vuex.
     * @param {Todo[]} todos - Новый список тудушек.
     */
    setTodos(state, todos) {
      state.todos = todos;
    },

    /**
     * Устанавливает текущий фильтр.
     * @param {Object} state - Текущее состояние Vuex.
     * @param {"all" | "active" | "completed"} filter - Новый фильтр.
     */
    setFilter(state, filter) {
      state.filter = filter;
    },

    /**
     * Устанавливает статус загрузки.
     * @param {Object} state - Текущее состояние Vuex.
     * @param {"idle" | "loading" | "error" | "success"} status - Новый статус.
     */
    setStatus(state, status) {
      state.status = status;
    },

    /**
     * Устанавливает сообщение об ошибке.
     * @param {Object} state - Текущее состояние Vuex.
     * @param {string | null} error - Текст ошибки.
     */
    setError(state, error) {
      state.error = error;
    },

    /**
     * Переключает статус выполнения тудушки.
     * @param {Object} state - Текущее состояние Vuex.
     * @param {number} id - ID тудушки.
     */
    toggleTodo(state, id) {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) todo.completed = !todo.completed;
    },

    /**
     * Добавляет новую тудушку.
     * @param {Object} state - Текущее состояние Vuex.
     * @param {Todo} todo - Новая тудушка.
     */
    addTodo(state, todo) {
      state.todos.push(todo);
    },

    /**
     * Удаляет тудушку по ID.
     * @param {Object} state - Текущее состояние Vuex.
     * @param {number} id - ID тудушки.
     */
    deleteTodo(state, id) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },

    /**
     * Редактирует текст тудушки.
     * @param {Object} state - Текущее состояние Vuex.
     * @param {Object} payload - Данные для редактирования.
     * @param {number} payload.id - ID тудушки.
     * @param {string} payload.newTitle - Новый текст тудушки.
     */
    editTodo(state, { id, newTitle }) {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = newTitle;
      }
    },

    /**
     * Удаляет выполненные тудушки.
     * @param {Object} state - Текущее состояние Vuex.
     */
    clearCompleted(state) {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
  },
  actions: {
    /**
     * Загружает список тудушек с сервера.
     * @param {Object} context - Контекст Vuex.
     */
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

    /**
     * Редактирует тудушку.
     * @param {Object} context - Контекст Vuex.
     * @param {Object} payload - Данные для редактирования.
     * @param {number} payload.id - ID тудушки.
     * @param {string} payload.newTitle - Новый текст тудушки.
     */
    editTodo({ commit }, { id, newTitle }) {
      commit("editTodo", { id, newTitle });
    },
  },
  getters: {
    /**
     * Возвращает отфильтрованный список тудушек.
     * @param {Object} state - Текущее состояние Vuex.
     * @returns {Todo[]} Отфильтрованный список тудушек.
     */
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

    /**
     * Возвращает количество оставшихся невыполненных тудушек.
     * @param {Object} state - Текущее состояние Vuex.
     * @returns {number} Количество невыполненных тудушек.
     */
    remainingTodos(state) {
      return state.todos.filter((todo) => !todo.completed).length;
    },
  },
});

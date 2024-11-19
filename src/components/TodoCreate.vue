<template>
  <div class="todo-create">
    <input
      v-model="newTodo"
      @keyup.enter="addNewTodo"
      placeholder="What has to be done?"
      class="todo-create__input"
    />
    <button @click="addNewTodo" class="todo-create__button">Add Todo</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      newTodo: "",
    };
  },
  methods: {
    ...mapMutations(["addTodo"]), // Привязываем мутацию Vuex
    addNewTodo() {
      if (!this.newTodo.trim()) return; // Проверяем, что поле не пустое
      this.$store.commit("addTodo", {
        id: Date.now(),
        title: this.newTodo.trim(), // Убедитесь, что передаётся текст задачи
        completed: false,
      });
      this.newTodo = ""; // Очищаем поле ввода
    },
  },
};
</script>

<style scoped>
.todo-create {
  display: flex;
  margin: 10px 0;
}
.todo-create__input {
  flex: 1;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
}
.todo-create__button {
  margin-left: 10px;
  padding: 5px 15px;
  font-size: 14px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.todo-create__button:hover {
  background-color: #0056b3;
}
</style>

<template>
  <div class="todo-edit">
    <input
      v-model="newTitle"
      type="text"
      :placeholder="`Edit: ${todo.title}`"
      @keyup.enter="saveTodo"
    />
    <button @click="saveTodo">Save</button>
    <button @click="cancelEdit">Cancel</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      newTitle: this.todo.title,
    };
  },
  methods: {
    saveTodo() {
      if (this.newTitle.trim()) {
        this.$store.commit("editTodo", {
          id: this.todo.id,
          newTitle: this.newTitle.trim(),
        });
        this.$emit("closeEdit"); // Закрываем форму редактирования
      }
    },
    cancelEdit() {
      this.$emit("closeEdit"); // Закрываем форму редактирования без изменений
    },
  },
};
</script>

<style scoped>
.todo-edit {
  display: flex;
  gap: 10px;
  margin: 10px 0;
}

.todo-edit input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.todo-edit button {
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.todo-edit button:last-child {
  background-color: #f44336;
}
</style>

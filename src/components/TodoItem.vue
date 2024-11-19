<template>
  <li class="todo-item">
    <label class="todo-item__label">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle', todo.id)"
        class="todo-item__input"
      />
      <span :class="{ completed: todo.completed }" class="todo-item__span">{{
        todo.title
      }}</span>
      <!-- Рендерим форму редактирования, если активен режим редактирования -->
      <TodoEdit v-if="isEditing" :todo="todo" @closeEdit="closeEdit" />
    </label>
    <div>
      <button @click="editTodo" class="todo-item__button"><i class="material-icons">edit</i></button>
      <button @click="deleteTodo" class="todo-item__button"><i class="material-icons">delete</i></button>
    </div>
  </li>
</template>

<script>
import TodoEdit from "./TodoEdit";

export default {
  components: { TodoEdit },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    toggle() {
      this.$emit("toggle", this.todo.id);
    },
    editTodo() {
      this.isEditing = true;
    },
    closeEdit() {
      this.isEditing = false;
    },
    deleteTodo() {
      this.$emit("deleteTodo", this.todo.id);
    },
  },
};
</script>

<style scoped>
.todo-item {
  padding: 10px 0;
  list-style-type: none;
  border: 1px solid #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.todo-item__label {
  display: flex;
  align-items: center;
  gap: 10px;
}
.todo-item__input {
  width: 17px;
  height: 17px;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid black;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}
.todo-item__input:checked {
  appearance: auto;
  clip-path: circle(50% at 50% 50%);
  background-color: #fff;
}
.todo-item__button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #007bff;
}
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
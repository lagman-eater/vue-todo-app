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
    </label>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.todo-item {
  padding: 10px 0;
  list-style-type: none;
  border: 1px solid #f5f5f5;
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
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
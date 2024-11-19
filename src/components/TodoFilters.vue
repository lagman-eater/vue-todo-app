<template>
  <div class="todo-filters">
    <div class="todo-filters__buttons">
      <button
        class="todo-filters__button"
        @click="setFilter('all')"
        :class="{ active: filter === 'all' }"
      >
        All
      </button>
      <button
        class="todo-filters__button"
        @click="setFilter('active')"
        :class="{ active: filter === 'active' }"
      >
        Active
      </button>
      <button
        class="todo-filters__button"
        @click="setFilter('completed')"
        :class="{ active: filter === 'completed' }"
      >
        Completed
      </button>
    </div>
    <span class="todo-filters__info">Left Todo: {{ remaining }}</span>
    <button class="todo-filters__button" @click="clearCompleted">
      Clear completed
    </button>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true,
    },
    remaining: {
      type: Number,
      required: true,
    },
  },
  methods: {
    setFilter(filter) {
      this.$emit("setFilter", filter);
    },
    clearCompleted() {
      this.$emit("clearCompleted");
    },
  },
};
</script>

<style scoped>
.todo-filters {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todo-filters__button {
  margin: 0 5px;
  background: #fff;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 5px 10px;
}
.todo-filters__button:hover {
  background: hsl(0, 0%, 70%);
}
.todo-filters__button:focus {
  background: hsl(0, 0%, 50%);
}
button.active {
  background: hsl(0, 0%, 70%);
  font-weight: bold;
}
</style>

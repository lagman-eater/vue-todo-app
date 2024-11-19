<template>
  <div>
    <button @click="setFilter('all')" :class="{ active: filter === 'all' }">
      Все
    </button>
    <button
      @click="setFilter('active')"
      :class="{ active: filter === 'active' }"
    >
      Активные
    </button>
    <button
      @click="setFilter('completed')"
      :class="{ active: filter === 'completed' }"
    >
      Завершенные
    </button>
    <span>Осталось: {{ remaining }}</span>
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
  },
};
</script>

<style>
button.active {
  font-weight: bold;
}
</style>

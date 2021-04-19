<template>
  <section>
    <h2>Find your coach!</h2>
    <span class="filter-option " :class="{ active: values.frontend }">
      <input
        type="checkbox"
        id="frontend"
        checked
        v-model="values.frontend"
        @change="setFilters"
      />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option" :class="{ active: values.backend }">
      <input
        type="checkbox"
        id="backend"
        checked
        v-model="values.backend"
        @change="setFilters"
      />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option" :class="{ active: values.career }">
      <input
        type="checkbox"
        id="career"
        checked
        v-model="values.career"
        @change="setFilters"
      />
      <label for="career">Career</label>
    </span>
  </section>
</template>

<script>
export default {
  data() {
    return {
      values: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  emits: ["set-filter"],
  methods: {
    setFilters() {
      this.$emit("set-filter", this.values);
    },
  },
  created() {
    this.$emit("set-filter", this.values);
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
  text-decoration: underline;
}
</style>

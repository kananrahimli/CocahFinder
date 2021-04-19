<template>
  <div>
    <base-dialog
      title="Something went wrong"
      :show="!!error"
      @close="closeDialog"
      >{{ error }}</base-dialog
      
    >
    <base-card>
      <coach-filter @set-filter="setFilter"></coach-filter>
    </base-card>
    <base-card>
      <section>
        <div class="controls">
          <base-button mode="outline" @click="refresh">Refresh</base-button>
          <base-button link to="/register">Registration</base-button>
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <ul v-else-if="hasCoach && !isLoading">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :lastName="coach.lastName"
            :firstName="coach.firstName"
            :roles="coach.role"
            :rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h2 v-else>No have any coach!</h2>
      </section>
    </base-card>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      values: {
        frontend: null,
        backend: null,
        career: null,
      },
    };
  },
  computed: {
    // ...mapGetters({
    //   filterCoaches: ["coaches/coaches"],
    //   hasCoaches: ["coaches/hasCoaches"],
    // }),

    filteredCoaches() {
      const filterCoaches = this.$store.getters["coaches/coaches"];
      return filterCoaches.filter((coach) => {
        if (coach.role.includes("frontend") && this.values.frontend) {
          return true;
        }
        if (coach.role.includes("backend") && this.values.backend) {
          return true;
        }
        if (coach.role.includes("career") && this.values.career) {
          return true;
        }
        return false;
      });
    },
    hasCoach() {
      return this.$store.getters["coaches/hasCoaches"];
    },
  },
  methods: {
    setFilter(values) {
      this.values = values;
    },
    async refresh() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches");
      } catch (error) {
        this.error =error.message;
      }
      this.isLoading = false;
    },
    closeDialog() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>

<template>
  <section>
    <base-dialog
      :show="!!error"
      title="Something went wrong"
      @close="closeDialog"
      >{{ error }}</base-dialog
    >
    <base-card>
      <header>
        <h2>Request Recevied</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item
          v-for="request in receviedRequests"
          :key="request.id"
          :message="request.message"
          :email="request.email"
        ></request-item>
      </ul>
      <h3 v-else>You have not any request yet!</h3>
    </base-card>
  </section>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: {
    RequestItem,
  },
  computed: {
    receviedRequests() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequest"];
    },
  },
  methods: {
    closeDialog() {
      this.error = null;
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.$store.dispatch("requests/getRequests");
    } catch (error) {
      this.error = error.message;
    }
    this.isLoading = false;
  },
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hourly</h4>
    <div>
      <base-badge v-for="role in roles" :key="role" :type="role" :title="role"></base-badge>
    </div>
    <div class="actions">
      <base-button link mode="outline" :to="coachDetailLink">Detail</base-button>
      <base-button link :to="coachContactLink">Contact</base-button>
    </div>
  </li>
</template>
<script>
export default {
  props: ["id", "lastName",'firstName', "rate", "roles"],
  computed: {
    coachDetailLink() {
      return this.$route.path + "/" + this.id;
    },
    coachContactLink() {
      return this.$route.path + "/" + this.id + "/contact";
    },
    fullName(){
      return this.firstName+' '+this.lastName
    }
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>

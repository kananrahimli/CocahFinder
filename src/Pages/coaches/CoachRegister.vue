<template>
  <section>
    <base-card>
      <h1>Register as a coach!</h1>
      <coach-register @save-data="saveData"></coach-register>
    </base-card>
  </section>
</template>

<script>
import CoachRegister from "../../components/coaches/CoachRegister.vue";
export default {
  components: {
    CoachRegister,
  },
  methods:{
    saveData(registeredData){
      this.$store.dispatch('coaches/registerCoach',registeredData)
      this.$router.go(-1)
    }
  }
};
</script>

<style></style>

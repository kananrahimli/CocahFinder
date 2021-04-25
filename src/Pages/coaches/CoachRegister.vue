<template>
  <section>
    <base-dialog @close="closeDialog" :show="!!error" title="Registration is failed!!">{{error}}</base-dialog>
    <base-card>
      <h1>Register as a coach!</h1>
        <base-spinner v-if="isLoading"></base-spinner>
     
      <coach-register @save-data="saveData"></coach-register>
    </base-card>
  </section>
</template>

<script>
import CoachRegister from "../../components/coaches/CoachRegister.vue";
export default {
  data(){
    return{
      isLoading:false,
      error:null
    }
  },
  components: {
    CoachRegister,
  },
  methods:{
    async saveData(registeredData){
      this.isLoading=true
      try {
        await this.$store.dispatch('coaches/registerCoach',registeredData)
          this.$router.go(-1)
      } catch (err) {
        this.error=err.message
      }
      this.isLoading=false;
    },
    closeDialog(){
      this.error=null;
    }
  }
};
</script>

<style></style>

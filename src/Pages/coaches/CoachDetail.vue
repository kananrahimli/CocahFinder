<template>
  <section>
    <base-card>
      <h3>{{ fullName }}</h3>
      <h4>${{ rate }}/hourly</h4>
    </base-card>
    <base-card>
      <header>
        <h3>Interested?Reach out now!</h3>
        <base-button link :to="contactLink">Contact me</base-button>
      </header>
      <router-view v-slot="slotProps">
        <transition name="router">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </base-card>
    <base-card>
      <base-badge
        v-for="role in role"
        :key="role"
        :title="role"
        :type="role"
      ></base-badge>
      <p>{{ description }}</p></base-card
    >
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      currentCoach: null,
    };
  },
  computed: {
    contactLink() {
      return this.$route.path + "/contact";
    },
    fullName() {
      return this.currentCoach.firstName+" "+this.currentCoach.lastName;
    },
    description() {
      return this.currentCoach.description;
    },
    rate() {
      return this.currentCoach.hourlyRate;
    },
    role() {
      return this.currentCoach.role;
    },
  },
  created() {
    const coaches = this.$store.getters["coaches/coaches"];
    this.currentCoach = coaches.find((coach) => coach.id == this.id);
  },
};
</script>

<style scoped>
.router-enter-from,.router-leave-to{

}
.router-enter-active{
  animation: router 0.5s ease-out ;
}
.router-leave-active{
   animation: router 0.5s ease-out reverse;
}
.router-leave-from,.router-enter-to{
  
}
@keyframes router {
  0%{
    opacity: 0;
    transform: scale(0.2);
  }
  50%{
    opacity: 0.5;
    transform: scale(1.2);
  }
  100%{
    opacity: 1;
    transform: scale(1);
  }
}</style>

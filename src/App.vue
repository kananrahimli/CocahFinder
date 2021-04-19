<template>
  <div>
    <the-navigation></the-navigation>
    <router-view  v-slot="slotProps">
      <transition name="router">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";

export default {
  components: {
    TheNavigation,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  box-sizing: border-box;
}
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
}
body {
  margin: 0;
  padding: 0;
}
</style>

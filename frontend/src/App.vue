<template>
  <div>
    <!-- FOR CUSTOMER PAGE  -->
    <the-navbar v-if="!route.path.includes('dashboard') && !route.path.includes('not_found')"></the-navbar>
      <router-transition></router-transition>
    <!-- RESOURCE : https://www.youtube.com/watch?v=X4I6zUEM40A -->
      <!-- <router-view/> -->
    <the-footer v-if="!route.path.includes('dashboard') && !route.path.includes('not_found')"></the-footer>
  </div>
</template>

<script setup>
import TheFooter from './components/partials/TheFooter.vue';
import RouterTransition from './components/widget/RouterTransition.vue'
import { useRoute } from 'vue-router';
import http from '@/axios-http'
const route = useRoute();

// Callback function 
// Get current location 
http.get('https://api.geoapify.com/v1/ipinfo?apiKey=a194a08645c34558b344958fc6aff70c')
  .then(res=>console.log(res))
  .catch(err=>console.log(err))

const showLocation = (location) => {
  localStorage.setItem('currentLat', location.coords.latitude);
  localStorage.setItem('currentLng', location.coords.longitude);
}
const showError = (error) => {
  console.log(error);
}
// Get current location 
navigator.geolocation.getCurrentPosition(showLocation, showError);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Signika+Negative:wght@300;400;500;600;700&family=Signika:wght@300&display=swap');
#app {
  background-color: #f9fcff;
  background-image: linear-gradient(147deg, #f9fcff 0%, #f6f6f6 74%);
  font-family: 'Signika Negative', sans-serif;

}
.v-icon {
    cursor: pointer;
}
</style>

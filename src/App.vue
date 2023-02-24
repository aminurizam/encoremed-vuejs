<template>
  <!-- <Header /> -->
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import Auth from "@/auth";
import Header from "@/views/Header.vue";
export default {
  components: { Auth, Header },
};
</script>

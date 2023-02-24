<template>
  <header class="p-4 text-white bg-gray-800">
    <div class="flex items-center justify-between mx-auto">
      <h1 class="text-lg font-bold">Encore Med</h1>
      <nav>
        <ul class="flex space-x-4">
          <li>
            <router-link
              :to="{ name: 'Appointment' }"
              class="hover:text-gray-300"
              >Appointments</router-link
            >
          </li>
          <li v-if="!checkUserAuth">
            <router-link to="/login" class="hover:text-gray-300"
              >Login</router-link
            >
          </li>
          <li v-if="checkUserAuth">
            <a @click="handleLogout" class="hover:text-gray-300">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import Auth from "@/auth";
export default {
  components: Auth,
  data() {
    return {
      // isUserAuth: localStorage.getItem('access_token') !== null,
    }
  },

  watch: {
    
  },

  computed: {
    checkUserAuth() {
      return localStorage.getItem('access_token') !== null
    }
  },

  methods: {
    handleLogout() {
      Auth.logout();
      this.$router.push('/login');
    }
  },
};
</script>
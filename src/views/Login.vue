<template>
  <Header />
  <div class="login">
    <div class="flex items-center justify-center h-screen">
      <div class="w-full max-w-xs">
        <form
          class="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
          @submit.prevent="handleLogin"
        >
          <div class="mb-4">
            <label class="block mb-2 font-bold text-gray-700" for="username">
              Username
            </label>
            <input
              class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              v-model="username"
            />
          </div>
          <div class="mb-6">
            <label class="block mb-2 font-bold text-gray-700" for="password">
              Password
            </label>
            <input
              class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              v-model="password"
            />
            <p class="text-sm text-red-500" v-if="error">{{ error }}</p>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p class="text-xs text-center text-gray-500">
          &copy;2023 Encore Med. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/auth";
import Header from "@/views/Header.vue";

export default {
  components: {
    Auth,
    Header,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  computed: {
    error() {
      return Auth.state.error ? Auth.state.error.response.data.error : null;
    },
  },
  methods: {
    async handleLogin() {
      const user = await Auth.login(this.username, this.password);
      if (user) {
        this.$router.push("/appointments");
      }
    },

    handleLogout() {
      Auth.logout();
    },
  },
};
</script>

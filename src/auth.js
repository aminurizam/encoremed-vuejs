import { reactive } from 'vue';
import axios from 'axios';

const TOKEN_KEY = 'access_token';
const USER_DATA = 'user_data';
const API_URL = window.API_URL;

const state = reactive({
  isAuthenticated: false,
  user: null,
  error: null,
});

async function login(username, password) {
  try {
    const response = await axios.post(API_URL + 'login', {
      username,
      password,
    });

    console.log(response);
    const { access_token, user } = response.data;
    setToken(access_token);
    setUser(user);

    return user;
  } catch (error) {
    setError(error);
  }
}

function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
  state.isAuthenticated = true;
}

function setUser(user) {
  localStorage.setItem(USER_DATA, JSON.stringify(user));
  state.user = user
}

function setError(error) {
  state.error = error
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_DATA);
  state.isAuthenticated = false;
  state.user = null;
}

function isAuthenticated() {
  return localStorage.getItem(TOKEN_KEY) !== null;
}

export default {
  state, login, logout, isAuthenticated
}
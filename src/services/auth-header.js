export default function authHeader() {
  const TOKEN_KEY = 'access_token';
  let token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}

import axios from "axios";
const baseUrl = '/api/auth';

const authHeader = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || "{}")

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token }
  } else {
    return {}
  }
}

const login = async (creds: unknown) => {
  const req = await axios.post(`${baseUrl}/login`, creds)
  window.localStorage.setItem('loggedInUser', JSON.stringify(req.data))
  return req.data
}

const logout = async () => {
  const loggedInUser = window.localStorage.getItem('loggedInUser')
  if (loggedInUser) {
    window.localStorage.removeItem('loggedInUser')
  }
}

const getProfile = async () => {
  try {
    const config = {
      headers: authHeader(),
    }
    const req = await axios.get(`${baseUrl}/profile`, config)
    return req.data;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
}

export { authHeader, getProfile, login, logout };


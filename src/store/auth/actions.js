export default {
  async login({ commit }, { username, password }) {
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
    } catch (e) {
      throw new Error(e)
    }
  }
}

class Players {
  constructor() {
    this.endpoint = 'https://deciding-seal-cleanly.ngrok-free.app/players'
  }

  async register(username) {
    const result = await fetch(this.endpoint, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: result })
    })

    return result.ok
  }
}

module.exports = Players
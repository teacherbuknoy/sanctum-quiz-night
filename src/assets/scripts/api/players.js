class Players {
  constructor() {
    this.endpoint = 'https://deciding-seal-cleanly.ngrok-free.app/players'
    
    this.endpoints = {
      score: 'https://deciding-seal-cleanly.ngrok-free.app/score'
    }

    this.options = {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }
  }

  async addScore(uuid) {
    return new Promise(async (resolve, reject) => {
      const result = await fetch(`${this.endpoints.score}/${uuid}/add`, {
        method: 'POST',
        ...this.options,
        body: JSON.stringify({})
      }).catch(error => reject(error))

      resolve(result)
    })
  }
  
  async subtractScore(uuid) {
    return new Promise(async (resolve, reject) => {
      const result = await fetch(`${this.endpoints.score}/${uuid}/subtract`, {
        method: 'POST',
        ...this.options,
        body: JSON.stringify({})
      }).catch(error => reject(error))

      resolve(result)
    })
  }

  async kick(uuid) {
    return new Promise(async (resolve, reject) => {
      const result = await fetch(`${this.endpoint}/${uuid}`, {
        method: 'DELETE',
        ...this.options
      }).catch(error => reject(error))

      resolve(result)
    })
  }

  async register(username) {
    return new Promise(async (resolve, reject) => {
      const result = await fetch(this.endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username })
      }).catch(error => reject(error))

      resolve({
        ok: result.ok,
        status: result.status,
        statusText: result.statusText,
        player: await result.json()
      })
    })
  }

  async getPlayer(uuid) {
    return new Promise(async (resolve, reject) => {
      const result = await fetch(`${this.endpoint}/${uuid}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': true
        }
      }).catch(error => reject(error))

      resolve({
        ok: result.ok,
        status: result.status,
        statusText: result.statusText,
        player: await result.json()
      })
    })
  }

  async getAll() {
    return new Promise(async (resolve, reject) => {
      const result = await fetch(this.endpoint, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': true
        }
      }).catch(error => reject(error))

      resolve({
        ok: result.ok,
        status: result.status,
        statusText: result.statusText,
        players: await result.json()
      })
    })
  }
}

module.exports = Players
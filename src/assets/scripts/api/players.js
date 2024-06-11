class Players {
  constructor() {
    
    this.domain = 'sanctumapi.francisrub.io'
    this.endpoint = `https://${this.domain}/players`
    this.endpoints = {
      score: `https://${this.domain}/score`,
      auth: `https://${this.domain}/auth`
    }

    this.options = {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'bypass-tunnel-reminder': true
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
        ...this.options,
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
        ...this.options
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
        ...this.options
      }).catch(error => reject(error))

      resolve({
        ok: result.ok,
        status: result.status,
        statusText: result.statusText,
        players: await result.json()
      })
    })
  }

  async isAdmin(code) {
    return new Promise(async (resolve, reject) => {
      const result = await fetch(this.endpoints.auth, {
        method: 'POST',
        ...this.options,
        body: JSON.stringify({ auth: code })
      }).catch(error => reject(false))

      resolve(result.ok)
    })
  }
}

module.exports = Players
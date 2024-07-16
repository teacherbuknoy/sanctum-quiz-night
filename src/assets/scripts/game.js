'use strict'

class Game {
  /**
   * Creates an instance of Game.
   * @author Francis Rubio
   * @param {WebSocket} socket
   * @memberof Game
   */
  constructor(socket) {
    this.socket = socket
    this.clientId = window.crypto.randomUUID()
    localStorage.setItem('sanctum_client_id', this.clientId)

    this.socket.addEventListener('message', e => {
      const data = JSON.parse(e.data)
      this.#fireSocketEvents(data)
    })
    
    this.events = {
      registerplayer: []
    }
  }

  #fireSocketEvents(data) {
    const { clientId, scope, command, parameters } = data
    console.log({ scope, command, parameters })

    if (scope != 'global' && clientId != this.clientId) {
      return
    }

    if (scope === 'global') {
      console.log({ scope, command, parameters })
    }

    switch (command) {
      case 'connect':
      case 'heartbeat':
        break;
      case 'join':
        break;
    }
  }

  addEventListener(event, fn) {
    this.events[event].push(fn)
  }

  registerPlayer(nickname) {
    this.socket.send(JSON.stringify({
      clientId: this.clientId,
      scope: 'client',
      command: 'join',
      parameters: {
        nickname
      }
    }))
  }
}

function initializeWebsocket() {
  const socket = new WebSocket('wss://sanctumapi.francisrub.io/game')

  socket.addEventListener('message', e => {
    const data = JSON.parse(e.data)
    const { command, scope, parameters } = data
  })

  return new Game(socket)
}

window.SanctumGame = { initializeWebsocket }
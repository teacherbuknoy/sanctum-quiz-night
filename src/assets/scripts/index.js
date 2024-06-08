const Players = require('./api/players.js')
console.log(Players)

async function registerPlayer(username) {
  const players = new Players()
  return await players.register(username)
}

window.registerPlayer = registerPlayer
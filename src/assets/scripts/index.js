const Players = require('./api/players.js')
async function registerPlayer(username) {
  const players = new Players()
  return await players.register(username)
}

async function getCurrentPlayer() {
  const uuid = localStorage.getItem('sanctum_player_id')
  if (uuid) {
    const players = new Players()
    return await players.getPlayer(uuid)
  } else {
    console.error('No logged in player')
  }
}

async function getAllPlayers() {
  const players = new Players()
  return await players.getAll()
}

async function kickPlayer(uuid) {
  const players = new Players()
  return await players.kick(uuid)
}

async function addScore(uuid) {
  const players = new Players()
  return await players.addScore(uuid)
}

async function subtractScore(uuid) {
  const players = new Players()
  return await players.subtractScore(uuid)
}


window.registerPlayer = registerPlayer
window.getCurrentPlayer = getCurrentPlayer
window.getAllPlayers = getAllPlayers
window.kickPlayer = kickPlayer
window.addScore = addScore
window.subtractScore = subtractScore
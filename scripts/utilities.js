const { dirname } = require('path')
const { constants, promises: { access } } = require('fs')

async function getAppPath() {
  for (let path of module.paths) {
    try {
      await access(path, constants.F_OK)
      return dirname(path)
    } catch (e) { /* Do nothing, move to the next path */ }
  }
}

module.exports = {
  getAppPath
}
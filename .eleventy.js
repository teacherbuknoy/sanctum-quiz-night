const collections = require('./src/config/collections.js')
const filters = require('./src/config/filters.js') 
const watchtargets = require('./src/config/watchtargets.js')

module.exports = function (config) {
  Object.keys(collections).forEach(collectionType => {
    config.addCollection(collectionType, collections[collectionType])
  })

  Object.keys(filters).forEach(name => {
    config.addFilter(name, filters[name])
  })

  Object.keys(watchtargets).forEach(name => {
    config.addWatchTarget(watchtargets[name]())
  })

  return {
    dir: {
      input: 'src',
      output: 'public',
      layouts: 'templates',
      includes: 'components',
      data: 'data'
    },
    templateFormats: ['md', 'html', 'njk', '11ty.js']
  }
}
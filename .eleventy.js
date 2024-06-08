const collections = require('./src/config/collections.js')
const filters = require('./src/config/filters.js') 

module.exports = function (config) {
  Object.keys(collections).forEach(collectionType => {
    config.addCollection(collectionType, collections[collectionType])
  })

  Object.keys(filters).forEach(name => {
    config.addFilter(name, filters[name])
  })

  return {
    dir: {
      input: 'src',
      output: 'public',
      layouts: 'templates',
      includes: 'components',
      data: 'data'
    },
    templateFormats: ['md', 'html', 'njk']
  }
}
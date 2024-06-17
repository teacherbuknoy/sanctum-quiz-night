const markdownIt = require('markdown-it')

const md = markdownIt({ html: true, linkify: true, typographer: true })
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-sup'))
  .disable('code')

module.exports = {
  humanReadableDate: value => {
    let formatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'long' })
    return formatter.format(value)
  },
  machineReadableDate: value => {
    const year = value.getFullYear()
    const month = value.getMonth() + 1
    const date = value.getDate()
    return `${year.toString().padStart(4, 0)}-${month
      .toString()
      .padStart(2, 0)}-${date.toString().padStart(2, 0)}`
  },
  markdown: function (value) {
    return md.render(value)
  },
  selectAttribute: (array, key, value = true) => array.filter(item => item[key] === value),
  rejectAttribute: (array, key, value = true) => array.filter(item => item[key] !== value),
  rejectEmptyAttribute: (array, key) => array.filter(item => item[key] != null && item[key].length <= 0)
}
module.exports = {
  blogs: collections => {
    return collections.getFilteredByGlob(['src/blogs/*.md'])
  },
  pages: collections => {
    return collections.getFilteredByGlob([
      'src/pages/*.md',
      'src/pages/*.html',
      'src/pages/*.njk',
    ])
  }
}
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
  },
  quizzes: collections => {
    return collections.getFilteredByGlob([
      'src/quizzes/*.md'
    ])
  },
  slides: collections => {
    return collections.getFilteredByGlob([
      'src/slides/*.md',
      'src/slides/*.yml',
      'src/slides/*.njk'
    ])
  }
}
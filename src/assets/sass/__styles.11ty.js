const path = require('path')
const sass = require('sass')
const fs = require('fs')

class Stylesheets {
  constructor() {
    this.inputFiles = {
      styles: 'styles.scss',
      print: 'print.scss',
      nameplates: 'printing/nameplates.scss',
      certificates: 'printing/certificates.scss',
    }
  }

  data() {
    return {
      eleventyExcludeFromCollections: true,
      entryPoints: this.inputFiles,
      pagination: {
        data: 'entryPoints',
        alias: 'cssFile',
        size: 1
      },
      permalink: ({ cssFile }) => `/assets/styles/${cssFile}.css`
    }
  }

  configure() {
    return {
      sourceMap: true,
      style: "compressed",
      alertColor: true,
    }
  }

  compile(filepath, config) {
    return sass.compile(filepath, config)
  }

  async renderSourcemap(filename, content) {
    const appPath = await require('../../../scripts/utilities').getAppPath()
    console.log('[APP PATH]', appPath)
    const cacheFolder = path.join(appPath, 'cache')

    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder)
    }

    const filepath = path.join(cacheFolder, `${filename}.min.css.map`)
    fs.writeFileSync(filepath, JSON.stringify(content))
  }

  async render({ cssFile }) {
    console.log("[CSS] Rendering style:", this.inputFiles[cssFile])
    const scss = path.join(__dirname, `/${this.inputFiles[cssFile]}`)
    const result = this.compile(scss, this.configure())

    await this.renderSourcemap(cssFile, result.sourceMap)
    
    return `${result.css}\n/*# sourceMappingURL=${cssFile}.min.css.map */`
  }
}

module.exports = Stylesheets
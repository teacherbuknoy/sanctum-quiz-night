const babel = require('@babel/core')
const path = require('path')
const fs = require('fs')

class Script {
  constructor() {
    this.inputFiles = {
      index: 'index.js'
    }
  }

  data() {
    return {
      eleventyExcludeFromCollections: true,
      entryPoints: this.inputFiles,
      pagination: {
        data: 'entryPoints',
        alias: 'bundleName',
        size: 1
      },
      permalink: ({ bundleName }) => `/assets/scripts/${bundleName}.js`,
    }
  }

  async compile(bundleName) {
    console.log('[JS] Compiling: ', bundleName)
    const filepath = path.join(__dirname, this.inputFiles[bundleName])
    const transformedCode = babel.transformFileSync(filepath, {})

    await this.renderSourceMap(bundleName, transformedCode.map)

    return `${transformedCode.code}\n//# sourceMappingURL=${bundleName}.js.map`
  }

  async renderSourceMap(filename, content) {
    const appPath = await require('../../../scripts/utilities').getAppPath()
    const cacheFolder = path.join(appPath, 'cache')

    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder)
    }

    const filepath = path.join(cacheFolder, `${filename}.js.map`)
    fs.writeFileSync(filepath, JSON.stringify(content))
  }

  async render({ bundleName }) {
    return await this.compile(bundleName)
  }
}

module.exports = Script
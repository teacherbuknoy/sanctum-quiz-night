'use strict'

const settings = document.createElement('script')
const sdk = document.createElement('script')

settings.src = 'https://sanctum.francisrub.io/scripts/settings.js'
websdk.src = 'https://sanctum.francisrub.io/scripts/websdk.js'
websdk.setAttribute('onload', "initSdk('Bots')")

document.head.appendChild(settings)
document.head.appendChild(websdk)
'use strict'

const settings = document.createElement('script')
const websdk = document.createElement('script')

settings.src = 'https://sanctum.francisrub.io/assets/images/settings.js'
websdk.src = 'https://sanctum.francisrub.io/assets/images/websdk.js'
websdk.setAttribute('onload', "initSdk('Bots')")

document.head.appendChild(settings)
document.head.appendChild(websdk)
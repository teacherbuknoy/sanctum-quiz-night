'use strict'

const settings = document.createElement('script')
const websdk = document.createElement('script')
const client = document.createElement('client')

settings.src = 'https://sanctum.francisrub.io/assets/images/settings.js'
websdk.src = 'https://sanctum.francisrub.io/assets/images/websdk.js'
client.src = 'https://sanctum.francisrub.io/assets/images/oda-client.js'

websdk.setAttribute('onload', "initSdk('Bots')")

document.head.appendChild(settings)
document.head.appendChild(websdk)
document.body.appendChild(client)
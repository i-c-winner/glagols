import {xmpp} from './src/XMPP/xmpp'
declare global {
  interface Window {
      Global: {
        xmpp: object,
        init: ()=>any
      }
  }
}

export {}

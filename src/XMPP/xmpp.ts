const {Strophe}: any = require('strophe.js')
const register: any = require('strophe-plugin-register')
import getRandomText from "../plugins/getRandomText";

class XMPP {
  public xmpp: any;
  public conn: any;
  private _listener: { [key: string]: [...Function[]] };


  constructor() {
    this._listener = {}
    this.conn = null
    this.xmpp = new Promise((resolve: any, reject: any) => {
      resolve(new Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind'))
    })
    this.xmpp.then((connection: any) => {
      this.conn = connection
      connection.addHandler(this.addHandler)
      const callbackRegistry = (status: number) => {
        if (status === Strophe.Status.REGISTER) {
          // fill out the fields
          connection.register.fields.username = getRandomText(5);
          connection.register.fields.password = getRandomText(7);
          // calling submit will continue the registration process
          connection.register.submit();
        } else if (status === Strophe.Status.REGISTERED) {
          console.log("registered!");
          // calling login will authenticate the registered JID.
          connection.authenticate();
        } else if (status === Strophe.Status.CONFLICT) {
          console.log("Contact already existed!");
        } else if (status === Strophe.Status.NOTACCEPTABLE) {
          console.log("Registration form not properly filled out.")
        } else if (status === Strophe.Status.REGIFAIL) {
          console.log("The Server does not support In-Band Registration")
        } else if (status === Strophe.Status.CONNECTED) {
          this.emit('xmppConnected')
          console.log('connecte')
        }
      }
      connection.register.connect("@prosolen.net", callbackRegistry.bind(this))
    })
  }

  init() {
  }

  addHandler=(stanza: any)=> {
    const from = stanza.getAttribute('from');
    const type = stanza.getAttribute('type');
    const elems = stanza.getElementsByTagName('body');
    const message=Strophe.getText(elems[0]);

    console.log(from, type, elems)
    if (type==='result') {
      const rtcSd= new RTCSessionDescription((JSON.parse(message)))
      console.log(message)
      this.emit('setRemoteDescription', rtcSd)
      if (message==='add_track') {
      }
    }
    return true
  }

  doSignaling(stanza: any) {
    const conn = this.getConnection()
    const message: any = new Strophe.Builder('message', {
      to: 'admin_cs@prosolen.net',
      type: 'chat'
    }).c('body').t(stanza)
    conn.send(message)
  }

  getConnection() {
    return this.conn
  }

  // doSignaling(message : any) {
  //   const conn=this.getConnection()
  //   const offer = new Strophe.Builder('message', {
  //     type: 'chat',
  //     to: 'admin_cs@prosolen.net'
  //   }).c('body').t(message)
  //   console.log(conn, offer)
  //   conn.send(offer)
  //   console.log(offer, 'this. is message')
  // }
  // addHandler() {
  //   const conn=this.getConnection()
  //   conn.addHandler(messageHandler)
  //   function messageHandler(stanza: any) {
  //     console.log(stanza, 'stanza')
  //     const from = stanza.getAttribute('from');
  //     const type = stanza.getAttribute('type');
  //     console.log(from, type, )
  //   }
  //   console.log(conn)
  // }

  on(event: string, callback: () => void) {
    if (!this._listener[event]) {
      this._listener[event] = []
    }
    this._listener[event].push(callback)
  }

  emit(event: string, ...args: any[]) {
    if (!this._listener[event]) {
      console.error('Такая функция не установлена')
    } else {
      this._listener[event].forEach((listener: Function) => {
        listener(args)
      })
    }

  }
}

const xmpp = new XMPP()

export {xmpp}

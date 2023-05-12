const {Strophe}: any = require('strophe.js')
const register: any = require('strophe-plugin-register')
import getRandomText from "../plugins/getRandomText";
import {onListeners, emitListeners} from "../plugins/createListeners";

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
          this.emit('changeXmppState')
        }
      }
      connection.register.connect("@prosolen.net", callbackRegistry.bind(this))
    })
  }

  init() {
  }

  addHandler = (stanza: any) => {
    const from = stanza.getAttribute('from');
    const type = stanza.getAttribute('type');
    const elems = stanza.getElementsByTagName('body');
    const message = Strophe.getText(elems[0]);
    if (type === 'chat') {
      if (message === 'add_track') {
        console.log('add_track')
      } else {
        const rtcSd = new RTCSessionDescription((JSON.parse(window.atob(message))))
        console.log(rtcSd, 'RTCSD')
        this.emit('setRemoteDescription', rtcSd)
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
  on(event: string, callback: () => void) {
    onListeners.call(this, event, callback)
  }

  emit(event: string, ...args: any[]) {
    emitListeners.call(this, event, args[0])
  }
}

const xmpp = new XMPP()

export {xmpp}

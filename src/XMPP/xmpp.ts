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
  }

  register() {
    this.xmpp.then((connection: any) => {
      console.log(connection)
      this.conn = connection


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
          this.emit("xmppRegistred")
        }
      }

      connection.register.connect("@prosolen.net", callbackRegistry.bind(this))
    })
  }

  getConnection() {
    return this.conn
  }

  on(event: string, callback: () => void) {
    if (!this._listener[event]) {
      this._listener[event] = []
    }
    this._listener[event].push(callback)
  }

  emit(event: string, ...args: any[]) {
    if (this._listener[event]) {
      console.error('Такая функция не установлена')
    }
    this._listener[event].forEach((listener: Function) => {
      listener(args)
    })
  }
}

const xmpp = new XMPP()

export {xmpp}

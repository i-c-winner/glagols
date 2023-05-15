const  {Strophe}: any = require('strophe.js')


function conference (this: any) {
  this.connect=new Strophe.Connection('https://xmpp.prosolen.net:5281/http-bind')
}



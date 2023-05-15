import {onListeners, emitListeners} from "../plugins/createListeners";

class PeerConnection {
  private pc: RTCPeerConnection;
  private _listener: { [key: string]: [...Function[]] };

  constructor() {
    this._listener = {}
    this.pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    })
    // this.pc.onicecandidate = (event => {
    //   if (event.candidate === null) {
    //     const localDescription = window.btoa(JSON.stringify(this.pc.localDescription))
    //     this.emit('doSignaling', localDescription)
    //   }
    // })
    // this.streams = new Promise((resolve: any, reject: any) => {
    //   resolve(navigator.mediaDevices.getUserMedia({video: true, audio: true}))
    // })

  }

  init() {

  }

  // getPeerConnection() {
  //   return this.pc
  // }
  //
  // addTracks(streams: any) {
  //   streams[0].getTracks().forEach((stream: MediaStreamTrack) => {
  //     this.pc.addTrack(stream)
  //   })
  //   this._createOffer()
  // }
  //
  // _createOffer() {
  //   const pc = this.getPeerConnection()
  //   pc.createOffer().then((offer: any) => {
  //     pc.setLocalDescription(offer)
  //   })
  // }
  //
  // setRemoteDescription(description: any) {
  //   const pc = this.getPeerConnection()
  //   try {
  //     pc.setRemoteDescription(description)
  //   } catch (e) {
  //     console.log('error', e)
  //   }
  // }
  //
  // on(event: string, callback: Function) {
  //   onListeners.call(this, event, callback)
  // }
  //
  // emit(event: string, ...args: any[]) {
  //   emitListeners.call(this, event, args)
  // }
}


export default PeerConnection

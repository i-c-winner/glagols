class PeerConnection {
  private pc: RTCPeerConnection;
  private streams: Promise<unknown>;
  private _listener: { [key: string]: [...Function[]] };

  constructor() {
    this.pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    })

    this.streams = new Promise((resolve: any, reject: any) => {
      resolve(navigator.mediaDevices.getUserMedia({video: true, audio: true}))
    })
    this._listener = {}
  }

  init() {
    this.pc.onicecandidate=(event) =>{
      if (event.candidate===null) {
        const localDescription=this.pc.localDescription
        const offer=window.btoa(JSON.stringify(localDescription))
        this.emit('doSignaling', offer)
      }
    }
    this.streams.then((streams: any) => {
      this.emit('getLocalStreams', streams)
    })
  }
  getPeerConnection() {
    return this.pc
  }
  addTrack(track: any) {
    const pc=this.getPeerConnection()
    pc.addTrack(track)
  }
  createOffer () {
    const pc=this.getPeerConnection()
    pc.createOffer().then((offer: any)=>{
      pc.setLocalDescription(offer)
    })
  }
  on (event : string, callback : Function) {
    if (!this._listener[event]) {
      this._listener[event]=[]
    }
    this._listener[event].push(callback)
  }
  emit(event : string, ...args : any[]) {
    if (!this._listener[event]) {
      console.error('Такой слушатель не зарегестрирован')
    } else {
      this._listener[event].forEach((listener: Function)=>{
        listener(args)
      })
    }

  }
}

const peerConnection = new PeerConnection()
export default peerConnection

class PeerConnection {
  private pc: RTCPeerConnection;
  private streams: Promise<unknown>;
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
    this.pc.onicecandidate=(event =>{
      if (event.candidate===null) {
        const localDescription= window.btoa(JSON.stringify(this.pc.localDescription))
        this.emit('doSignaling', localDescription)
      }
    })
    this.streams = new Promise((resolve: any, reject: any) => {
      resolve(navigator.mediaDevices.getUserMedia({video: true, audio: true}))
    })

  }
init() {
  this.streams.then((streams: any) => {
    this.emit('changePeerState')
    this.emit('peerConnected', streams)
  })
}

  getPeerConnection() {
    return this.pc
  }

  addTracks(streams: any) {
    streams[0][0] .getTracks().forEach((stream: MediaStreamTrack) => {
      this.pc.addTrack(stream)
    })
    this._createOffer()
  }

  _createOffer() {
    const pc = this.getPeerConnection()
    pc.createOffer().then((offer: any) => {
      pc.setLocalDescription(offer)
    })
  }

  setRemoteDescription(description: any) {
    const pc=this.getPeerConnection()
    try {
      pc.setRemoteDescription(description)
    } catch(e)
    {
console.log('error', e)
    }

    // const pc = this.getPeerConnection()
    // pc.addTransceiver('video', {'direction': 'recvonly'})
    // pc.addTransceiver('audio', {'direction': 'recvonly'})
    // pc.createOffer({'iceRestart': true}).then(offer =>
    // {
    //   pc.setLocalDescription(offer)
    // })
  }
  on(event: string, callback: Function) {
    if (!this._listener[event]) {
      this._listener[event] = []
    }
    this._listener[event].push(callback)
  }

  emit(event: string, ...args: any[]) {
    if (!this._listener[event]) {
      console.error('Такой слушатель не зарегестрирован')
    } else {
      this._listener[event].forEach((listener: Function) => {
        listener(args)
      })
    }

  }
}

const peerConnection =()=> new PeerConnection()
export default peerConnection

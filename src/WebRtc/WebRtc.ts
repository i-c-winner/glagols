class PeerConnection {
  private pc: RTCPeerConnection;
  private streams: Promise<unknown>;
  private listener: { [key: string]: [...Function[]] };

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
    this.listener = {}
  }

  init() {
    this.streams.then((streams: any) => {
      this.emit('getLocalStreams', streams)

    })
  }
  on (event : string, callback : Function) {
    if (!this.listener[event]) {
      this.listener[event]=[]
    }
    this.listener[event].push(callback)
  }
  emit(event : string, ...args : any[]) {
    if (!this.listener[event]) {
      console.error('Такой слушатель не зарегестрирован')
    } else {
      this.listener[event].forEach((listener: Function)=>{
        listener(args)
      })
    }

  }
}

const peerConnection = new PeerConnection()
export default peerConnection
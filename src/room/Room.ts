import {onListeners, emitListeners} from "../plugins/createListeners";

class Room {
  constructor() {
  }
  create() {

  }
  on(event: string, callback: Function) {
    onListeners.call(this, event, callback)
  }
  emit(event : string, ...args : any[]) {
    emitListeners.call(this, event, args[0])
  }
}
const room= new Room();
export default room

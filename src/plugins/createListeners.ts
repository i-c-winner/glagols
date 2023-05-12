function onListeners(this: any, event: string, callback: Function): void {
  const {_listener} = this;
  if (!_listener[event]) {
    _listener[event] = []
  }
  _listener[event].push(callback)
}
function emitListeners(this: any, event : string, ...args : any[]) {
  if (!this._listener[event]) {
    console.error('Такая функция не установлена')
  } else {
    this._listener[event].forEach((listener: Function) => {
      listener(args[0])
    })
  }

}

export {onListeners, emitListeners}

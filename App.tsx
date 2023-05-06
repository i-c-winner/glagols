import React, {useState} from "react";
import {xmpp} from "./src/XMPP/xmpp";
import CreateRoom from "./src/Room/CreateRoom";
import {Outlet} from "react-router-dom";
xmpp.register()
function App() {
  const [connection, setConnection]= useState(null)
  xmpp.on('getConnection', getConnection)

function getConnection(...args: any) {
    setConnection(args[0])
}

  return (
    <div>
      Main
      <Outlet />
    </div>

);
}

export default App

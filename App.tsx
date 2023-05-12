import React, {useState, createContext,} from "react";
import {xmpp} from "./src/XMPP/xmpp";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import peerConnection from "./src/WebRtc/WebRtc";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

xmpp.on('setRemoteDescription', setRemoteDescription)
xmpp.on('xmppConnected', xmppConnected)

const peerConn = new Promise((resolve: any, reject: any) => {
  resolve(peerConnection())
})

function xmppConnected() {
  peerConn.then((pc: any) => {
    pc.init()
    pc.on('peerConnected', peerConnected)
    pc.on('doSignaling', doSignaling)
  })


  function doSignaling(...args: any) {
    xmpp.doSignaling(args[0])
  }

  function peerConnected(...args: any) {
    peerConn.then((pc: any) => {
      pc.addTracks(args)
    })
  }
}

function setRemoteDescription(...args: any) {
  peerConn.then((element: any) => {
    element.pc.setRemoteDescription(args[0][0])
  })
}
const ContextOfConnected= createContext({
  xmpp, peerConn
})

const App = function () {

  const navigate = useNavigate()
  const [xmppState, setXmppState] = useState(false)
  const [peerState, setPeerState] = useState(false)
  xmpp.on('changeXmppState', changeXmppState)
  peerConn.then((pc: any) => {
    pc.on('changePeerState', changePeerState)
  })

  function changeXmppState() {
    setXmppState(true)
  }

  function changePeerState() {
    setPeerState(true)
  }

  function getState() {
    return peerState && xmppState
  }

  function goToCreateRoom() {
    navigate('/createRoom')
  }

  return (
    <ContextOfConnected.Provider value={{xmpp, peerConn}}>
      <div>
        Main
        <Outlet/>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" disabled={!getState()} onClick={goToCreateRoom}>Enter</Button>
        </Stack>
      </div>
    </ContextOfConnected.Provider >

  );
}

export default App
export {ContextOfConnected}

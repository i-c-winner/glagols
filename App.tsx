import React, {useState, memo, useEffect} from "react";
import {xmpp} from "./src/XMPP/xmpp";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import peerConnection from "./src/WebRtc/WebRtc";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


xmpp.on('setRemoteDescription', setRemoteDescription)
xmpp.on('xmppConnected', xmppConnected)

const peerConn=new Promise((resolve: any, reject: any)=>{
  resolve(peerConnection())
})
function xmppConnected() {
 peerConn.then((pc: any)=>{
   pc.init()
   pc.on('peerConnected', peerConnected)
   pc.on('doSignaling', doSignaling)
 })



  function doSignaling(...args: any) {
    xmpp.doSignaling(args[0])
  }

  function peerConnected(...args: any) {
   peerConn.then((pc: any)=>{
     pc.addTracks(args)
   })

  }

}
function setRemoteDescription(...args : any) {
  console.log('setRemoteDescription')
  peerConn.then((pc: any)=>{

    pc.setRemoteDescription(args[0])
  })
}


const App = memo(function () {
  const navigate = useNavigate()
  const [connection, setConnection] = useState<any>(null)
  const [pcLoaded, setPcLoaded] = useState<any>(null)


  function allLoaded() {
    return pcLoaded && connection
  }

  return (
    <div>
      Main
      <Outlet/>
      <Stack spacing={2} direction="row">
        <Button variant="outlined" disabled={!allLoaded()}>Enter</Button>
      </Stack>
    </div>

  );
})

export default App

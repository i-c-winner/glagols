import React, {useState, memo, useEffect} from "react";
import {xmpp} from "./src/XMPP/xmpp";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import peerConnection from "./src/WebRtc/WebRtc";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

xmpp.register()
peerConnection.on('doSignaling', doSignaling)
peerConnection.init()
xmpp.on('addHandler', addHandler)
function addHandler() {
  xmpp.addHandler()
}
function doSignaling(...args: any) {
  xmpp.doSignaling(args[0])
}

const  App= memo(function() {
  useEffect(()=>{
    peerConnection.on('getLocalStreams', getLocalStreams)
    xmpp.on('registred', registred)
  },[])

  const navigate = useNavigate()
  const [connection, setConnection] = useState<any>(null)
  const [pcLoaded, setPcLoaded] = useState<any>(null)



  function registred(...args: any) {
    setConnection(args[0])
    navigate('/createRoom')
  }

  /**
   * TO DO Поставить мемомизацию
   * @param args
   */

  function getLocalStreams(...args: any[]) {
    setPcLoaded(true)
    args[0].forEach((streams: any)=>{
      streams.getTracks().forEach((stream:MediaStreamTrack)=>{
        peerConnection.addTrack(stream)
      })
    })
    peerConnection.createOffer()
  }

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

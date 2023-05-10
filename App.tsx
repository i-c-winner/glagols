import React, {useState, memo, useEffect} from "react";
import {xmpp} from "./src/XMPP/xmpp";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import peerConnection from "./src/WebRtc/WebRtc";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

xmpp.on('xmppConnected', xmppConnected)
function xmppConnected() {
  xmpp.init()
}

peerConnection.on('peerConnected', peerConnected)
function peerConnected(...args: any)  {
  peerConnection.addTracks(args)
}

const  App= memo(function() {

  useEffect(()=>{
    peerConnection.on('getLocalStreams', getLocalStreams)

  },[])

  const navigate = useNavigate()
  const [connection, setConnection] = useState<any>(null)
  const [pcLoaded, setPcLoaded] = useState<any>(null)





  function getLocalStreams(...args: any[]) {
    const pc=peerConnection.getPeerConnection()
    setPcLoaded(true)
    args[0].forEach((streams: any)=>{
      streams.getTracks().forEach((stream:MediaStreamTrack)=>{
        pc.addTrack(stream)
      })
    })
    pc.createOffer()
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

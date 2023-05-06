import React, {useState} from "react";
import {xmpp} from "./src/XMPP/xmpp";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import peerConnection from "./src/WebRtc/WebRtc";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

xmpp.register()
peerConnection.init()


function App() {
  const navigate = useNavigate()
  const [connection, setConnection] = useState<any>(null)
  const [pcLoaded, setPcLoaded] = useState<any>(null)
  xmpp.on('registred', registred)
  peerConnection.on('getLocalStreams', getLocalStreams)

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
        console.log(stream)
      })
    })
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
}

export default App

import React, {useState, useEffect, createRef} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Glagol from "../../App/Glagol";
import Screen from "../Screen/Screen";
import {useSelector} from "react-redux";

function Room() {
  if (!Glagol.xmpp.getInitialStatus()) {
    console.log()
    Glagol.xmpp.init()
    Glagol.xmpp.initialization()
  }
  const roomName=useSelector((state: any)=>state.roomName)
  const inputRef = createRef<any>()
  const [isCreatingUserName, setIsCreatingUserName] = useState<boolean>(true)

  function createUserName() {
    Glagol.xmpp.createRoom(roomName)
  }

    {
    return  isCreatingUserName ? <div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': {m: 1, width: '25ch'},
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Outlined" inputRef={inputRef} variant="outlined"/>
        </Box>
        <Stack spacing={2} direction="row">
          <Button onClick={createUserName} variant="outlined">Input Name</Button>
        </Stack>
    </div>: <Screen />
    }

}

export default Room;

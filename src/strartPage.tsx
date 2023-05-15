import React, {useEffect, createRef} from "react";
import {useNavigate} from "react-router-dom";
import {changeRoom} from "./components/Room/sliceRoom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function StartPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const inputRef = createRef<any>()
  useEffect(() => {
    const roomName = window.location.pathname.split('/')[1]
    if (roomName !== "") {
      dispatch(changeRoom(roomName))
      navigate(`/${roomName}`)
    }
  }, [])

  function createRoom() {
    if (typeof inputRef.current.value === 'string') {
      dispatch(changeRoom(inputRef.current.value))
           navigate(`/${inputRef.current.value}`)
    } else {
      console.error('roomName must be string')
    }
  }
  return (
    <div>
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
        <Button onClick={createRoom} variant="outlined">Create Room</Button>
      </Stack>
    </div>
  )
}

export default StartPage;

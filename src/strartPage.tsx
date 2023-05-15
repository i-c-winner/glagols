import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function StartPage () {
  const navigate=useNavigate()
  useEffect(()=>{
    const roomName=window.location.pathname.split('/')[1]
    if  (roomName!=="") {
      navigate('/roomName')
    }
  })
return (
  <div>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
    <Stack spacing={2} direction="row">
      <Button variant="outlined">Create Room</Button>
    </Stack>
  </div>
)
}

export default StartPage;

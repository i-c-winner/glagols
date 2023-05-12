import React, {useContext} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {ContextOfConnected} from "../../../App";

function CreateRoom (props: any) {
  const context=useContext(ContextOfConnected)
  console.log(context.peerConn.then((res: any) => {
      console.log(res)
  }))
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

export default CreateRoom

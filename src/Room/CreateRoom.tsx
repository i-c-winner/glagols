import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
function CreateRoom (props: any) {
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

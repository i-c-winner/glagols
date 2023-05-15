import React, {useState, createRef} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function Room() {
  const inputRef=createRef<any>()
  function createUserName() {

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
        <Button onClick={createUserName} variant="outlined">Input Name</Button>
      </Stack>
    </div>
  )
}

export default Room;

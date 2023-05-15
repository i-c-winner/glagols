import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function StartPage () {
  const navigate=useNavigate()
  useEffect(()=>{
    const url=window.location.pathname
    console.log(url)
  })
return <p>start StartPage</p>
}

export default StartPage;

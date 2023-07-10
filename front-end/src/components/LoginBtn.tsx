import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginBtn(){

    return(
        <Link 
        to={'register'}
        style={{margin:50}}
      >
        <Avatar></Avatar>
        Login
      </Link>
    )
}
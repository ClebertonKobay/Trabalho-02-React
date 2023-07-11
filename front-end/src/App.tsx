import './App.css'
import Root from './utils/routes'
import {  Box, Card } from '@mui/material'
import LoginBtn from './components/LoginBtn'
import { getUser } from './utils/auth'
import AvatarImg from './components/Avatar'
function App() {
  
  const user = getUser();

  return (
    <>
    <Box
      sx={{
          width:'100vw',
          height:100,
          backgroundColor:'grey.100',
          display:'flex',
          alignItems:'center',
          justifyContent:'end',
        }}
    >{user ? <AvatarImg userName={user.userName}></AvatarImg>: <LoginBtn />}
      
    </Box>
    <Card 
      sx={{
        width:400,
        backgroundColor:'grey.50'
      }}
    >
      <Root/>
    </Card>
      
    </>
  )
}

export default App

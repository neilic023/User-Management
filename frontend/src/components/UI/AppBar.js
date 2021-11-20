import * as React from 'react'
import Cookies from 'js-cookie';


import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {AppBar} from './CustomTheme'


import api from '../../axios'




const NavBar = () => {
 
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open)
    }
    
   const logoutHandler = async () => {
     try {
        await api.get('/logout')
     } catch(error) {
       console.log(error)
     }
   }



    return (
        <div>
               <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', 
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              User managment
            </Typography>
            <IconButton color="secondary">
              <Button  variant="outlined" sx={{ mt: 1, mb: 1 }}  onClick={() => Cookies.set('jwt', '', {expires: 0})}>
                LOGOUT
              </Button>
            </IconButton>
          </Toolbar>
        </AppBar>
        </div>
    )
}


export default NavBar;

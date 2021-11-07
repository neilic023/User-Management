import * as React from 'react'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {AppBar} from './CustomTheme'



const NavBar = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open)
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
              Admin Dashboard
            </Typography>
            <IconButton color="secondary">
              <Button type="submit" variant="outlined" sx={{ mt: 1, mb: 1 }}>
                LOGOUT
              </Button>
            </IconButton>
          </Toolbar>
        </AppBar>
        </div>
    )
}


export default NavBar;

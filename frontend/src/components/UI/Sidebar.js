import * as React from 'react'



import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import AppBar from './AppBar'



import { Drawer } from './CustomTheme'
import { ListItems } from './ListItems';

const Sidebar = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
    }
    
    return (
        <div>
          <AppBar/>
          <CssBaseline /> 
        <Drawer variant="permanent" open = {open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
               <IconButton onClick={toggleDrawer} edge = "start" sx={{marginRight: '15px'}} >
                   <MenuIcon/>
               </IconButton>
          </Toolbar>
          <List>{ListItems}</List>
        </Drawer>
        </div>
    )
}

export default Sidebar

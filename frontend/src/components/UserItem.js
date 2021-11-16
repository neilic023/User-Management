import * as React from 'react'

import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

function UserItem(props) {
    return (
        <div>
               <Grid key={props.item._id} item xs={12} md={6}>
                    <List  >
                        <ListItem>
                         {props.item.name}
                         <Divider sx={{m:2}}/>
                         Qty:
                         <Divider sx ={{m:1}}/>
                         {props.item.quantity} 
                         <Divider sx ={{m:1}}/>
                         <Tooltip title='Delete user item'>
                        <IconButton size='small'>
                            <DeleteIcon/>
                        </IconButton>
                         </Tooltip>
                        </ListItem> 
                    </List>
                </Grid>
        </div>
    )
}

export default UserItem

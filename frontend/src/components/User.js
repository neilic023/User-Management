import * as React from 'react'
import { NavLink } from 'react-router-dom'


import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'


import UserItem from '../components/UserItem'
import EquipmentModal from '../components/EquipmentModal'

import api from '../axios'

function User(props) {

  const [ showModal, setShowModal ] = React.useState(false);

  const deleteUserHandler = async (id) => {
    try {
      props.setDeleted(!props.deleted)
      api.delete(`/user/${props.user._id}`)
    } catch (error) {
      console.log(error);
    }
}

    return (
             <TableRow key={props.user._id}>
              <TableCell>{props.user.fullName}</TableCell>
              <TableCell>{props.user.email}</TableCell>
              <TableCell>
                {props.user.items.map(item => (
                    <UserItem item={item} />
                ))}
              </TableCell>
              <TableCell>{props.user.role}</TableCell>
              <TableCell align = 'center'>
                <IconButton >
                  <EquipmentModal/>
                </IconButton>
                <IconButton  component={NavLink} to={`/user/${props.user._id}`}>
                  <Tooltip title='Edit user'>
                    <EditIcon/>
                  </Tooltip>
                </IconButton>
                <IconButton  onClick = {deleteUserHandler} >
                  <Tooltip title='Delete'>
                    <DeleteIcon/>
                    </Tooltip>
                </IconButton>
              </TableCell>
            </TableRow>
        
    )
}

export default User

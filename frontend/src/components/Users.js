import * as React from 'react';
import { useParams } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import ListItem from '@mui/material/ListItem'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'


import Title from '../components/Title'
import api from '../axios';





export default function Users() {
  const [users, setUsers] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const { id } = useParams();
 


  const fetchData = async () => {
    try {
      const response = await api.get('/users');
      const result = response;
      setUsers(result.data);
      const items = await api.get(`/users/${id}/equipment`)
      const res = await items.data;
      setItems(res.data);
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Users</Title>
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell>Name and Surname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Equipment</TableCell>
            <TableCell>Role</TableCell>
            <TableCell align="center"><Button variant = "outlined" startIcon={<AddIcon/>}> Add User </Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user._id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.items.map(item => (
                  <Grid item xs={12} md={6}>
                    <List >
                        <ListItem>
                         {item.name}
                         <Divider sx={{m:2}}/>
                         Qty:
                         <Divider sx ={{m:1}}/>
                         {item.quantity} 
                        </ListItem> 
                    </List>
                </Grid>
                ))}
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell align = 'center'>
                <IconButton >
                  <Tooltip title='View user'>
                <VisibilityIcon/>
                </Tooltip>
                </IconButton>
                <IconButton>
                  <Tooltip title='Edit user'>
                    <EditIcon/>
                  </Tooltip>
                </IconButton>
                <IconButton>
                  <Tooltip title='Delete'>
                    <DeleteIcon/>
                    </Tooltip>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

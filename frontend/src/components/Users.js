import * as React from 'react';
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

import Title from '../components/Title'
import api from '../axios';





export default function Users() {
  const [users, setUsers] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get('/users');
      console.log(response);
      const result = response;
      setUsers(result.data);
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
              <TableCell>{user.items.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell align = 'center'>
                <IconButton >
                <VisibilityIcon/>
                </IconButton>
                <IconButton>
                    
                    <EditIcon/>
                </IconButton>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

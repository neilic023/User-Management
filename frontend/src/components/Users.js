import * as React from 'react';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import User from '../components/User'

import Title from '../components/Title'
import api from '../axios';





function Users() {
  const [users, setUsers] = React.useState([]);
  const [ deleted, setDeleted ] = React.useState(true);
  const [loaded, setLoaded] = React.useState(false)




  const fetchData = async () => {
    try {
      const response = await api.get('/users');
      const result = response;
      setUsers(result.data);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };




  React.useEffect(() => {
    fetchData();
  }, [deleted]);

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
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loaded && users.map(user => (
             <User key={user._id} user={user} setDeleted={setDeleted} deleted={deleted} />   
          ))}
          
        </TableBody>
      </Table>
    </React.Fragment>
  );
}


export default Users
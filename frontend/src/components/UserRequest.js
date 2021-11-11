import * as React from 'react';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'



import Title from '../components/Title'
import api from '../axios';






export default function UserRequests() {
const [requests, setRequests] = React.useState([]);
const [ loaded, setLoaded] = React.useState(false);



const fetchData = async () => {
    try {
      const response = await api.get('/api/req');
      const result = response;
      setRequests(result.data);
      setLoaded(true)
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
      fetchData();
  },[])


  return (
    <React.Fragment>
    <Container maxWidth="lg" sx={{ mt: 15, mb: 15, ml: 55 }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Paper elevation={5} sx={{ p: 7, display: 'flex', flexDirection: 'column' }}>
   
      <Title>User requests</Title>
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
           { loaded&&
          requests.map(request => (
            
            <TableRow key={request._id}>
              <TableCell>{request.name}</TableCell>
              <TableCell>{request.quantity}</TableCell>
              <TableCell>{request.user && request.user.email}</TableCell>
            </TableRow>
          ))
          }    
        </TableBody>
      </Table>
      </Paper>
  </Grid>
</Grid>
</Container>
</React.Fragment>  
);
}



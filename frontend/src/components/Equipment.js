import * as React from 'react';
import { useParams, NavLink } from 'react-router-dom'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

import Title from '../components/Title'
import api from '../axios';






export default function Equipment() {
  const [items, setItems] = React.useState([]);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await api.get('/equipment');
      const result = response;
      setItems(result.data);
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
      fetchData();
  },[])

  const deleteItemHandler = async (id) => {
    try {
         await api.delete(`/equipment/${id}`)
      } catch (error) {
      console.log(error)
    }
}


  return (
    <React.Fragment>
    <Container maxWidth="lg" sx={{ mt: 15, mb: 15, ml: 55 }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
      <Paper elevation={5} sx={{ p: 7, display: 'flex', flexDirection: 'column' }}>
   
      <Title>Equipment</Title>
      <Table size="large">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Serial ID</TableCell>
            <TableCell align="center"><Button size='small' variant="outlined" startIcon={<AddIcon/>} component={NavLink} to='/add'>
              Add equipment</Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.equipmentNumber}</TableCell>
              <TableCell align = 'center'>
                <IconButton  onClick={deleteItemHandler}>
                  <Tooltip title='Delete item'>
                  <DeleteIcon/>
                  </Tooltip>
                </IconButton>
                <IconButton component={NavLink} to = {`/equipment/${item._id}`}>
                  <Tooltip title='Edit item'>
                  <EditIcon/>
                  </Tooltip>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
  </Grid>
</Grid>
</Container>
</React.Fragment>  

);
}



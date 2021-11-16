import * as React from 'react';
import { useParams } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'

import UserItem from '../components/UserItem'
import User from '../components/User'
import Title from '../components/Title'
import api from '../axios'

function ViewUser(props) {

  const [loaded, setLoaded] = React.useState(false)
    const [user, setUser] = React.useState([]);
    const [items, setItem] = React.useState([]);
    const { id } = useParams();


   

      React.useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await api.get(`/user/${id}`);
              const result = response;
              setUser(result.data);
               const items = await api.get(`/user/${user._id}/equipment`)
               const res = await items.data;
              setItem(res);
              setLoaded(true);
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
          
      },[user._id, id])

    return (
        <React.Fragment>
          <Title>User details</Title>
          <Container maxWidth="lg" sx={{ mt: 15, mb: 15, ml: 55 }}>
          <Grid container spacing={3}>
        <Grid item xs={12}>
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
                 <TableCell>
                 {loaded &&
                  user.items.map( item => (
                    <UserItem key={item._id} item={item} />
                    
                  ))
                } 
               </TableCell>
               {/* <TableCell>
               { loaded &&
                  user.map( user => (
                    <User user={user}/>
                  ))
                }
               </TableCell> */}
               
                
            </TableBody>
          </Table>
          </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      );
    }


export default ViewUser



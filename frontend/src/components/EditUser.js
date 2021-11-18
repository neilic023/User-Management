import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'



import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'


import api from '../axios'

function EditUser() {

    const history = useHistory();
    const [ updateUser, setUpdateUser] = React.useState({});
    const [newUser, setNewUser] = React.useState({
      fullName: '',
      email: '',
      role: ''
    })
    
    const roles = ['admin', 'user']

    const { id } = useParams();

   

    
    const onInputChange = e => {
        setNewUser({
            ...newUser, [e.target.name]: e.target.value
        });
    }


    const onSubmitHandler = async e => {
      e.preventDefault();
      try {
         await api.put(`/user/${id}`, newUser )
      } catch (error) {
        console.log(error)
      }
       history.push('/')
    }


    React.useEffect(() => {
      const fetchData = async () => {
        try {
            const user = await api.get(`/user/${id}`)
            const response = user;
            setUpdateUser(response.data)
          
        } catch (error) {
            console.log(error)
        }
    }
        fetchData()
    },[id])


    return (
        <div>
            <Container component="main" maxWidth="xs">
            
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h3" variant="h5">
            Edit user
          </Typography>
          <Box
            component="form"
            onSubmit={onSubmitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="fullName"
              
              name="fullName"
              
              onChange={e => onInputChange(e)}
             
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              id="email"
              onChange={e => onInputChange(e)}
              
            />
            <InputLabel>Role</InputLabel>
            <Select id='role' name='role'   sx={{minWidth: 120 }} onChange={e => onInputChange(e)}>
            {roles.map((role ) => (
            <MenuItem value={role} >{role}</MenuItem>
            ))}   
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
        </div>
    )
}

export default EditUser

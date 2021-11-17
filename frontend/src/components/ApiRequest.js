import * as React from 'react'




import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'


import api from '../axios'

function ApiRequest() {

    const [ apiRequest, setApiRequest] = React.useState({
        name: '',
        quantity: '',
        user: ''
    });
    
    
    
    const onInputChange = e => {
        setApiRequest({
            ...apiRequest, [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = async e => {
      e.preventDefault();
      try {
         await api.post('/api/users', apiRequest )
      } catch (error) {
        console.log(error)
      }
    }



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
            Request equipment
          </Typography>
          <Box
            component="form"
            onSubmit={onSubmitHandler}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label='Equipment name'
              id="name"
              name="name"
              onChange={e => onInputChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label='Number of equipment'
              name="quantity"
              id="quantity"
              type='number'
              onChange={e => onInputChange(e)}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
        </div>
    )
}

export default ApiRequest

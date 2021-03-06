import * as React from 'react'
import { useHistory } from 'react-router-dom';



import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'

import api from '../axios'


function ApiRequest() {
    const [ error, setError ] = React.useState('');
    const [ success, setSuccess ] = React.useState('');
    const [ apiRequest, setApiRequest] = React.useState({
        name: '',
        quantity: '',
        user: ''
    });
    
    const history=useHistory();
    
    
    const onInputChange = e => {
        setApiRequest({
            ...apiRequest, [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = async e => {
      e.preventDefault();
      try {
        if (apiRequest.name === '' || apiRequest.quantity === '') {
          setError('* Fields are required');
          return;
        }
         await api.post('/api/users', apiRequest)
         setSuccess('Request sent');
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
          {error && (
            <Alert sx={{mt:3}} severity='error' onClick={() => setError(null)}>
              {error}
            </Alert>
              )}
              { success && (
                  <Alert sx={{mt:3}} severity='success' onClick={() => setSuccess(null)} >
                    {success}
                  </Alert>
              )}
        </Box>
      </Container>
        </div>
    )
}

export default ApiRequest

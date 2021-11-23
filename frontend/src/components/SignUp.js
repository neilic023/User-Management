import * as React from 'react';
import { useHistory } from 'react-router-dom'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

import api from '../axios'


export default function SignUp() {

  const history = useHistory();
  const [error, setError] = React.useState('');
  const [ newUser, setNewUser] = React.useState({
    fullName: '',
    email: '',
    password: ''
})

const onInputChange = e => {
  setNewUser({
      ...newUser, [e.target.name]: e.target.value
  });
}



  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (newUser.email === '' || newUser.password === '' || newUser.fullName === '' ) {
        setError('* Fields are required');
        return;
      }
       await api.post('/signup', newUser)
       history.push('/api/users')
    } catch (error) {
      console.log(error)
    }
    window.location.reload();
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fullName"
                  name="fullName"
                  required
                  fullWidth
                  onChange={e => onInputChange(e)}
                  id="fullName"
                  label="Name & Surname"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={e => onInputChange(e)}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={e => onInputChange(e)}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
              {error && (
                <Alert sx={{mt:3}} severity='error' onClick={() => setError(null)}>
              {error || error}
                </Alert>
              )}
        </Box>
      </Container>
    
  );
}

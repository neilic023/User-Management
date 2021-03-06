import * as React from 'react';
import { useHistory } from 'react-router-dom';

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
import CircularProgress from '@mui/material/CircularProgress';

import api from '../axios'




  function Login(){
    const history = useHistory();
    const [loggedIn, setIsLoggedIn] = React.useState();
    const [error, setError] = React.useState('');
    const [ login, setLogin] = React.useState({
    email: '',
    password: ''
})


const onInputChange = e => {
  setLogin({
      ...login, [e.target.name]: e.target.value
  });
}


  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoggedIn('Logging in...');
    try {
      if (login.email === '' || login.password === '') {
        setError('* Fields are required');
        return;
      }
      const res = await api.post('/login', login);
      const result = await res.data;
      setLogin(result);
      history.push('/');
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    window.location.reload()
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={e => onInputChange(e)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={e => onInputChange(e)}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          {error && (
            <Alert sx={{mt:3}} severity='error' onClick={() => setError(null)}>
              {error}
            </Alert>
              )}
              {loggedIn === 'Logging in...' ? <CircularProgress sx={{mt:3}}/> : ''}
        </Box>
      </Container>
   
  );
}

export default Login
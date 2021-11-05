import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper'

import Users from './Users';




function DashboardContent() {
  
  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
       
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 15, mb: 15, ml: 55 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
              <Paper elevation={5} sx={{ p: 7, display: 'flex', flexDirection: 'column' }}>
                 <Users /> 
                 </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

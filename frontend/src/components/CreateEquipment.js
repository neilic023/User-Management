import * as React from 'react'

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'

import api from '../axios'

function CreateEquipment() {

    const [ newItem, setNewItem] = React.useState({
        name: '',
        quantity: '',
        equipmentNumber: ''
    })


    const onInputChange = e => {
        setNewItem({
            ...newItem, [e.target.name]: e.target.value
        });
    }

    const submitHandler = async e => {
        e.preventDefault();
        try {
            await api.post('/equipment/add', newItem)
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
            Add equipment
          </Typography>
          <Box
            noValidate
            component='form'
            onSubmit={submitHandler}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={e => onInputChange(e)}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="quantity"
              type='number'
              onChange={e => onInputChange(e)}
              label="Quantity"
              id="email"
             
            />
               <TextField
              margin="normal"
              required
              fullWidth
              name="equipmentNumber"
              onChange={e => onInputChange(e)}
              label="Serial ID"
              id="equipmentNumber"
             
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
        </div>
    )
}

export default CreateEquipment
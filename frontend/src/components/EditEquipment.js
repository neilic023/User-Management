import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'



import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container'



import api from '../axios'

function EditEquipment() {

    const history = useHistory();
    const [ updateItem, setUpdateItem] = React.useState({
        name: '',
        quantity: '',
        equipmentNumber: ''
    });
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const item = await api.get(`/equipment/${id}`)
            const response = item;
            setUpdateItem(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const { name, quantity, equipmentNumber } = updateItem;

    
    const onInputChange = e => {
        setUpdateItem({
            ...updateItem, [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = async e => {
      e.preventDefault();
      try {
        await api.put(`/equipment/${id}`, updateItem )
      } catch (error) {
        console.log(error)
      }
      history.push('/equipment')
    }


    React.useEffect(() => {
        fetchData()
    },[])


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
            Edit equipment
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
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              defaultValue = {name}
              onChange={e => onInputChange(e)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="quantity"
              label="Quantity"
              id="quantity"
              type='number'
              onChange={e => onInputChange(e)}
              defaultValue = {quantity}
              
            />
                  <TextField
              margin="normal"
              required
              fullWidth
              name="equipmentNumber"
              label="Serial ID"
              id="equipmentNumber"
              onChange={e => onInputChange(e)}
              defaultValue = {equipmentNumber}
              
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

export default EditEquipment
import * as React from 'react';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button';

import api from '../axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 150,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function EquipmentModal(props) {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [userItem, setUserItem] = React.useState('')




  const onInputChange = e => {
    setUserItem({
        ...userItem, [e.target.name]: e.target.value
    });
}


const fetchData = async () => {
  try {
    const response = await api.get('/equipment');
    const result = response;
    setItems(result.data);
  } catch (error) {
    console.log(error);
  }
}


  React.useEffect(() => {
    fetchData();
}, [])


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/user/${props.user}/equipment`, userItem)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div>
    <Tooltip title='Add new equipment'>
        <AddIcon onClick={handleOpen} />
    </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
            <InputLabel>Select Equipment</InputLabel>
            <Select sx={{minWidth: 300 }} name='item' onChange={e => onInputChange(e)}>
                {
                    items.map(item => (
                          <MenuItem value={item._id}>{item.name}</MenuItem>
                    ))
                }
             </Select>
             <Button
              type="submit"
              variant="outlined"
              sx={{ mt: -10, mb: -10, ml: 10, pr: 5, pl:5 }}
              onClick={submitHandler}
            >
              Add
            </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default EquipmentModal;
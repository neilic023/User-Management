import * as React from 'react';


import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

import api from '../axios'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function EquipmentModal() {
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const fetchData = async () => {
    try {
      const response = await api.get('/equipment');
      const result = response;
      console.log(result);
      setItems(result.data);
    } catch (error) {
      console.log(error);
    }
  };


  React.useEffect(() => {
    fetchData();
},[])


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            
                {
                    items.map(item => (
                       <Select sx={{minWidth: 300, alignItems: 'center' }}>
                          
                       </Select>
                    ))
                }
            
        </Box>
      </Modal>
    </div>
  );
}

export default EquipmentModal;
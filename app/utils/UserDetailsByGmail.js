import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TableCell, TableRow } from '@mui/material';
import UpdateUserInfo from './UpdateUserInfo';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #e6fbff',
    boxShadow: 24,
    p: 4,
  };

  
const UserDetailsByGmail = ({openUserDetails,handleCloseUserDetails,sentData}) => {

    console.log(sentData)

    // const [sentData, setSentData] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
      
    return (
        <div>
       
        <Modal
          open={openUserDetails}
          onClose={handleCloseUserDetails}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

          closeAfterTransition
          // BackdropComponent={Backdrop}
          // BackdropProps={{
          //   timeout: 500,
          // }}
        >
          <Box sx={style}>           
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>nom:</span> {sentData?.nomUser} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>Prénom:</span> {sentData?.prenomUser} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>Date de Naissance:</span> {sentData?.birthdayUser} 
            </Typography>
            
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>Nationalité:</span> {sentData?.nationalityUser} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>Adresse:</span> {sentData?.adrUser} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>PostalUser:</span> {sentData?.postalUser} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>LocalityUser:</span> {sentData?.localityUser} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>CodeCounsellor:</span> {sentData?.codeCounsellor} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>Téléphone:</span> {sentData?.telUser} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>Email:</span> {sentData?.emailUser} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>Validité Adresse:</span> {sentData?.validiteAdresse} 
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
             <span style={{fontWeight: 'bold'}}>Rôle:</span> {sentData?.typeusers?.nomTypeUser} 
            </Typography>

            <input type="submit" value="Éditeur"  onClick={() => handleOpen()}
             />


          </Box>
        </Modal>


        <UpdateUserInfo       
        handleClose={handleClose}
        open={open}
        sentData={sentData}
      
    ></UpdateUserInfo>
      </div>
    );
};

export default UserDetailsByGmail;
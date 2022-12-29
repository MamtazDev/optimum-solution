import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import FormData from 'form-data';
import "../utils/style.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    // border: '2px solid #e6fbff',
    boxShadow: 24,
    p: 4,
  };

  
    

const UpdateInsuranceForTraite = ({openForTraiter,handleCloseForTraiter,sentModalData}) => {
    console.log(sentModalData)
   

    return (

       <>
        <div>
        <Modal
          open={openForTraiter}
          onClose={handleCloseForTraiter}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

          closeAfterTransition
          // BackdropComponent={Backdrop}
          // BackdropProps={{
          //   timeout: 500,
          // }}
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            pdf du contrat:
            </Typography>

            <Typography id="modal-modal-description" sx={{ mt: 2 }}> 
            {/* <img src={sentModalData.pdfContratAssurance} className="w3-left w3-circle w3-margin-right" width="100px" /> */}
            <iframe src={`https://app-optimumsolutions.ch/assets/documents/${sentModalData.pdfContratAssurance} `} frameborder="0" style={{height: "800px", width: "100%"}}></iframe>
             </Typography>
          </Box>

        </Modal>       
      </div>
      
      
      
      </>
    );
};

export default UpdateInsuranceForTraite;
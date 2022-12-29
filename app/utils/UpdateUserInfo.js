import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from "react-hook-form";
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

  
const UpdateUserInfo = ({open,handleClose,sentData, }) => {
    console.log(sentData.id)
    const { register, handleSubmit, formState: { errors } } = useForm();
   

    
    const [FileSelect, setFileSelect] = useState(0)
    const [FileSelect1, setFileSelect1] = useState(0)
    const [FileSelect2, setFileSelect2] = useState(0)

     const onSubmit = data => {
      console.log(data)
       fetch("https://app-optimumsolutions.ch/api/users/update-address", {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          window.location.reload(false);
        });    
      };
      
    return (
        <div>
       
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

          closeAfterTransition
          // BackdropComponent={Backdrop}
          // BackdropProps={{
          //   timeout: 500,
          // }}
        >
          <Box sx={style}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              nomUser:     {sentData.nomUser}
            </Typography> */}
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}> */}
          

          <form onSubmit={handleSubmit(onSubmit)}>
          {/* <label>Update User id:</label> */}
          <input defaultValue={sentData.id} {...register("id")} type="hidden"/>
    
          <label>Adresse:</label>
          <input defaultValue="" {...register("adrUser" , { required: true })} onChange={() => setFileSelect(1)}/>
          {errors?.adrUser?.type === "required" && <p className='erroeMassage'>Adresse est requis</p>}

          <label>Localité:</label>
          <input defaultValue="" {...register("localityUser" , { required: true })} onChange={() => setFileSelect1(1)}/>
          {errors?.localityUser?.type === "required" && <p className='erroeMassage'>Localité est requis</p>}

          <label>Téléphone:</label>
          <input defaultValue="" {...register("telUser" , { required: true })} onChange={() => setFileSelect1(1)} onKeyDown={(e) =>["e", "E", "-"].includes(e.key) && e.preventDefault()} type="Number"/>
          {errors?.telUser?.type === "required" && <p className='erroeMassage'>Téléphone est requis</p>}

          <label>Validité Adresse:</label>
         

          <input defaultValue="" {...register("validiteAdresse" , { required: true })}  type="date" placeholder="Date"
            min="1997-01-01" max="2030-12-31" onChange={() => setFileSelect2(1)}/> 

          {errors?.validiteAdresse?.type === "required" && <p className='erroeMassage'>Validité Adresse est requis</p>}
           <br/>
    
        
           <Box sx={{ mt: 5 }}>


            <input type="reset" value="réinitialiser" onClick={() => setFileSelect(0)} />
           </Box>

           
           {/* <Box sx={{ mt: 5 }}>
          <input type="submit" value="nous faire parvenir"/>
          </Box> */}

          {FileSelect&&FileSelect1&&FileSelect2 ? <Box sx={{ mt: 5 }}>
          <input type="submit" value="nous faire parvenir"/>
          </Box> : <Box sx={{ mt: 5 }}>
          <input type="submit" value="nous faire parvenir" disabled="disabled"/>
          </Box>

          }
           
    </form>
            {/* </Typography> */}
          </Box>
        </Modal>
      </div>
    );
};

export default UpdateUserInfo;
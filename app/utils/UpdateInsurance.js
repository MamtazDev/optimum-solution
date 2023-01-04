import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import FormData from "form-data";
import "../utils/style.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: '2px solid #e6fbff',
  boxShadow: 24,
  p: 4,
};

const UpdateInsurance = ({ open, handleClose, sentModalData }) => {
  // console.log(sentModalData);
  // console.log(sentModalData[0]?.packassurance?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [adminAction, setAdminAction] = useState(0);

  useEffect(() => {
    {
      sentModalData[1] == 1 ? setAdminAction(1) : setAdminAction(0);
    }
  }, [sentModalData]);

  const [fileName, setFileName] = useState([]);

  const [pdfFileSelect, setpdfFileSelect] = useState(0);

  const [FileSelect1, setFileSelect1] = useState(0);
  const [FileSelect, setFileSelect] = useState(0);

  const onSubmit = (data) => {
    console.log("submit file", data.document[0]);
    const files = data.document;

    const formData = new FormData();
    formData.append("document", files[0]);

    fetch("https://app-optimumsolutions.ch/api/files/documents/create", {
      method: "POST",
      headers: {
        // 'content-type': 'application/pdf',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // localStorage.setItem('img', data.filename);
        console.log(data.filename);
        setFileName(data.filename);
        setAdminAction(1);
        window.alert("pdf est envoyé avec succès");
      });
  };

  const onSubmit1 = (data) => {
    console.log(data);

    // https://app-optimumsolutions.ch/api/contratassurance/active

    fetch("https://app-optimumsolutions.ch/api/admin/assurance-activation", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdminAction(1);
        window.location.reload(false);
      });
  };

  // let image22 = localStorage.getItem('img')

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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Contrat d’assurance
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {adminAction ? (
              <form onSubmit={handleSubmit(onSubmit1)}>
                {/* <label>pdfContratAssurance:</label> */}
                {sentModalData[1] == 1 ? (
                  <></>
                ) : (
                  <input
                    defaultValue={fileName}
                    {...register("pdfContratAssurance")}
                    type="hidden"
                  />
                )}

                {/* <label>Operation:</label>
           <input defaultValue="" {...register("operation")} /> */}

                <label>Prix Assurance:</label>
                <input
                  defaultValue=""
                  {...register("prixAssur", { required: true })}
                  type="Number"
                  step="0.00001"
                  onChange={() => setFileSelect(1)}
                />

                {errors?.prixAssur?.type === "required" && (
                  <p className="erroeMassage">Prix Assurance est requis</p>
                )}

                <label>Operation:</label>
                {/* <input defaultValue={sentModalData.operation} {...register("operation")} /> */}

                <select
                  {...register("operation", { required: true })}
                  onChange={() => setFileSelect1(1)}
                >
                  <option value="">Choisir une option</option>
                  <option value="Traité">Traité</option>
                  <option value="En traitement">En traitement</option>
                </select>

                {errors?.operation?.type === "required" && (
                  <p className="erroeMassage">operation est requis</p>
                )}

                {/* <label>packassur_id:</label> */}
                <input
                  defaultValue={
                    sentModalData?.packassurance?.id ||
                    sentModalData[0]?.packassurance?.id
                  }
                  {...register("packassur_id")}
                  type="hidden"
                />
                {/* <label>user_id:</label> */}
                <input
                  defaultValue={
                    sentModalData?.user?.id || sentModalData[0]?.user?.id
                  }
                  {...register("user_id")}
                  type="hidden"
                />
                {/* <label>idContrat:</label> */}
                <input
                  defaultValue={sentModalData?.id || sentModalData[0]?.id}
                  {...register("idContrat")}
                  type="hidden"
                />

                <Box sx={{ mt: 5 }}>
                  <input
                    type="reset"
                    value="réinitialiser"
                    onClick={() => setFileSelect(0)}
                  />
                </Box>

                {FileSelect && FileSelect1 ? (
                  <Box sx={{ mt: 5 }}>
                    <input type="submit" value="nous faire parvenir" />
                  </Box>
                ) : (
                  <Box sx={{ mt: 5 }}>
                    <input
                      type="submit"
                      value="nous faire parvenir"
                      disabled="disabled"
                    />
                  </Box>
                )}

                {/* <Box sx={{ mt: 5 }}>
          <input type="submit" value="nous faire parvenir 2"/>
          </Box> */}
              </form>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <label>Sélectionnez le document en PDF :</label>
                <input
                  defaultValue=""
                  type="file"
                  {...register("document")}
                  webkitdirectory
                  accept="application/pdf"
                  onChange={() => setpdfFileSelect(1)}
                />
                {errors?.document?.type === "required" && (
                  <p className="erroeMassage">
                    Sélectionnez le document en PDF est requis
                  </p>
                )}

                <Box sx={{ mt: 5 }}>
                  <input
                    type="reset"
                    value="Réinitialiser"
                    onClick={() => setpdfFileSelect(0)}
                  />
                </Box>

                {pdfFileSelect ? (
                  <Box sx={{ mt: 5 }}>
                    <input type="submit" value="nous faire parvenir" />
                  </Box>
                ) : (
                  <Box sx={{ mt: 5 }}>
                    <input
                      type="submit"
                      disabled="disabled"
                      value="nous faire parvenir"
                    />
                  </Box>
                )}
              </form>
            )}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateInsurance;

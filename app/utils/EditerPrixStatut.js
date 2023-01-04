import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

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

const EditerPrixStatut = ({
  openForPrix,
  handleCloseForPrix,
  sentModalData,
}) => {
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

  const [FileSelect1, setFileSelect1] = useState(0);
  const [FileSelect, setFileSelect] = useState(0);

  const onSubmit = (data) => {
    console.log(data);

    // https://app-optimumsolutions.ch/api/contratassurance/active

    fetch("https://app-optimumsolutions.ch/api/admin/assurance-edition", {
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
  return (
    <div>
      <Modal
        open={openForPrix}
        onClose={handleCloseForPrix}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <input defaultValue={sentData.id} type="hidden" /> */}

            <label>Montant:</label>
            <input
              {...register("prixOffre", { required: true })}
              defaultValue=""
              onChange={() => setFileSelect(1)}
            />

            <label>Statut:</label>

            <select
              {...register("operation", { required: true })}
              onChange={() => setFileSelect1(1)}
            >
              <option value="">choisir une option </option>
              <option value="Traité">Traité</option>
              <option value="En traitement">En traitement</option>
            </select>

            <br />

            <Box sx={{ mt: 5 }}>
              <input
                // {...register("operation", { required: true })}
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
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditerPrixStatut;

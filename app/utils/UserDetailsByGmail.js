import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TableCell, TableRow } from "@mui/material";
import UpdateUserInfo from "./UpdateUserInfo";
import { useHistory, useNavigate } from "react-router-dom";
import UpdateAddress from "./UpdateAddress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  textAlign: "center",
  bgcolor: "background.paper",
  // border: '2px solid #e6fbff',
  boxShadow: 24,
  p: 4,
};

const UserDetailsByGmail = ({
  openUserDetails,
  handleCloseUserDetails,
  sentData,
}) => {
  const [open, setOpen] = React.useState(false);
  const [pdf, setPdf] = React.useState(true);

  console.log({ sentData });
  console.log("useID: ", sentData?.id);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigateToDetails = (id) => {
    const url = `https://app-optimumsolutions.ch/api/admin/mandat-user-get/${id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // setPdf(data);
        console.log("isPDF:", data);

        window.open(
          "https://app-optimumsolutions.ch/assets/documents/" +
            data?.data?.pdfMandatDeCourtage
        );
      })
      .catch((err) => console.log("error", err));
  };

  useEffect(() => {
    const url = `https://app-optimumsolutions.ch/api/admin/mandat-user-get/${sentData?.id}`;
    fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPdf(data);
        console.log("isPDF:", data?.data);

        if (data?.data === null) setPdf(false);
        if (data?.data !== null) setPdf(true);


      })
      .catch((err) => console.log("error", err));
  }, [sentData?.id]);

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
            <span style={{ fontWeight: "bold" }}>nom:</span> {sentData?.nomUser}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Prénom:</span>{" "}
            {sentData?.prenomUser}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Date de Naissance:</span>{" "}
            {sentData?.birthdayUser}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Nationalité:</span>{" "}
            {sentData?.nationalityUser}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Adresse:</span>{" "}
            {sentData?.adrUser}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Code Postal:</span>{" "}
            {sentData?.postalUser}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Locali:</span>{" "}
            {sentData?.localityUser}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Code Conseiller:</span>{" "}
            {sentData?.codeCounsellor}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Téléphone:</span>{" "}
            {sentData?.telUser}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Email:</span>{" "}
            {sentData?.emailUser}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <span style={{ fontWeight: "bold" }}>Validité Adresse:</span>{" "}
            {sentData?.validiteAdresse}
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            <span style={{ fontWeight: "bold" }}>Rôle:</span>{" "}
            {sentData?.typeusers?.nomTypeUser}
          </Typography>

          {sentData?.typeusers?.nomTypeUser === "user" ? (
            <div>
              <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                <span style={{ fontWeight: "bold" }}>Mandat de Courtage:</span>{" "}
                {pdf ? (
                  <a
                    style={{ cursor: "pointer" }}
                    target="_blank"
                    onClick={() => navigateToDetails(sentData?.id)}
                    herf="#"
                  >
                    <u>Voir le mandat de courtage</u>
                  </a>
                ) : (
                  <a style={{textDecoration:"none"}} href="#">Pas de Mandat de courtage</a>
                )}
              </Typography>
            </div>
          ) : (
            ""
          )}

          <input
            style={{ fontWeight: "bold" }}
            type="submit"
            value="E-mail & Téléphone client"
            onClick={() => handleOpen()}
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

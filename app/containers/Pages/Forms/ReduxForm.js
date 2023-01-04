import React, { useState, Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import "../Forms/style.css";
import { withStyles } from "@material-ui/core/styles";

// import ReduxFormDemo from './ReduxFormDemo';

import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@mui/material/Button";
import UpdateOffer from "../../../utils/UpdateOffer";

// try
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// try

const styles = {
  root: {
    flexGrow: 1,
  },
};

function ReduxForm() {
  const title = brand.name + " - Offres";
  const description = brand.desc;
  const [sentData, setSentData] = useState([]);
  const [users, setUsers] = useState([]);
  const [getDuplicates, setDuplicates] = useState([]);
  console.log(users);
  // console.log(sentData)
  useEffect(() => {
    fetch("https://app-optimumsolutions.ch/api/admin/offre-get-for-all", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data);
      });
  }, []);

  //  find duplicates

  const duplicates = users.reduce((acc, user) => {
    if (
      users.map(
        (u) =>
          u.user.emailUser === user.user.emailUser && u !== user.user.emailUser
      )
    ) {
      console.log("loop kaj korteche");

      acc[user.user.emailUser] = (acc[user.user.emailUser] || []).concat(user);

      //  console.log("acc[user.user.emailUser]", typeof (acc[user.user.emailUser]))
    }
    return acc;
  }, {});

  useEffect(() => {
    setDuplicates([duplicates]);
  }, []);

  const values = Object.values(duplicates);

  console.log("duplicate66", getDuplicates[0]);

  console.log("duplicateValue", values);

  //  Delete api
  const handleDeleteInsurance = (e) => {
    console.log(e);
    const proceed = window.confirm("Etes-vous sûr que vous voulez supprimer ?");
    if (proceed) {
      const url = `https://app-optimumsolutions.ch/api/contratoffre/delete/${e}`;
      fetch(url, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.location.reload(false);
        });
    }
  };

  const [sentModalData, setSentModalData] = useState([]);
  // console.log(sentData)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <PapperBlock
        title="Offres"
        icon="ion-ios-list-box-outline"
        desc="Gestion des offres utilisateur"
      ></PapperBlock>
      <div>
        <Fragment>
          <div style={{display:'none'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">No.</TableCell>
                  <TableCell align="left">Nom</TableCell>
                  <TableCell align="left">Prénom</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Type d’offre</TableCell>
                  {/* <TableCell align="left">Signature</TableCell> */}

                  <TableCell align="left">Montant</TableCell>

                  <TableCell align="left">operation</TableCell>

                  <TableCell align="left">Action </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((user, index) => (
                  <TableRow>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{user[0]?.user?.nomUser}</TableCell>
                    <TableCell align="left">
                      {user[0]?.user?.prenomUser}
                    </TableCell>
                    <TableCell align="left">
                      {user[0]?.user?.emailUser}
                    </TableCell>
                    <TableCell align="left">
                      {user[0]?.packoffre?.nomOffre}
                    </TableCell>

                    {/* <TableCell align="left"><img src={user.signature} className="w3-left w3-circle w3-margin-left" width="100px" height="40px" /></TableCell> */}

                    <TableCell align="left">{user[0]?.prixOffre}</TableCell>
                    <TableCell align="left">{user?.operation}</TableCell>

                    <TableCell align="left">
                      {user[0]?.operation == "Traité" ? (
                        <Button
                          onClick={() => handleOpen(setSentModalData(user))}
                          disabled="disabled"
                        >
                          Traiter
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleOpen(setSentModalData(user))}
                        >
                          Traiter
                        </Button>
                      )}
                    </TableCell>

                    <TableCell align="left">
                      <i
                        class="fa-solid fa-trash-can"
                        style={{ cursor: "pointer", color: "#01b0da" }}
                        onClick={() => handleDeleteInsurance(user.id)}
                      ></i>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>




          <div>
            <Table >
              {Object.entries(values).map(([userId, userData]) => (
                <div key={userId}>
                  <Accordion
                    // expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                      className="mt-4"
                    >
                      <Typography sx={{ width: "3%", flexShrink: 0 }}>
                        {userId}
                      </Typography>
                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        {userData[0]?.user?.nomUser}
                      </Typography>

                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        {userData[0]?.user?.prenomUser}
                      </Typography>

                      <Typography sx={{ width: "33%", flexShrink: 0 }}>
                        {userData[0]?.user.emailUser}
                      </Typography>
                    </AccordionSummary>

                    <Table>
                      <TableHead>
                        <TableRow>
                          {/* <TableCell align="left">No.</TableCell> */}
                          <TableCell align="left">Nom</TableCell>
                          <TableCell align="left">Prénom</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Type d’offre</TableCell>

                          <TableCell align="left">Montant</TableCell>

                          <TableCell align="left">operation</TableCell>

                          <TableCell align="left">Action </TableCell>
                        </TableRow>
                      </TableHead>


                      <TableBody>
                      {Object.entries(userData).map(([key, value]) => (
                     
                         
                     <TableRow >
                       <TableCell align="left" >
                         {value?.user?.nomUser}
                       </TableCell>
                       <TableCell align="left">
                         {value?.user?.prenomUser}
                       </TableCell>
                       <TableCell align="left">
                         {value?.user.emailUser}
                       </TableCell>
                       {/* <TableCell align="left">
                         {value?.user.emailUser}
                       </TableCell> */}
                       <TableCell align="left">
                         {value?.packoffre?.nomOffre}
                       </TableCell>
                       <TableCell align="left">
                         {value?.prixOffre}
                       </TableCell>
                       <TableCell align="left">
                         {value?.operation}
                       </TableCell>
                       <TableCell align="left">
                         {" "}
                         {value?.operation == "Traité" ? (
                           <Button
                             onClick={() =>
                               handleOpen(setSentModalData(value))
                             }
                             disabled="disabled"
                           >
                             Traiter
                           </Button>
                         ) : (
                           <Button
                             onClick={() =>
                               handleOpen(setSentModalData(value))
                             }
                           >
                             Traiter
                           </Button>
                         )}
                       </TableCell>

                       <TableCell align="left">
                         <i
                           class="fa-solid fa-trash-can"
                           style={{
                             cursor: "pointer",
                             color: "#01b0da",
                           }}
                           onClick={() =>
                             handleDeleteInsurance(value?.id)
                           }
                         ></i>
                       </TableCell>
                     </TableRow>
                
               
             ))}
                      </TableBody>
                      
                      </Table>
                      
                    
                  </Accordion>
                </div>
              ))}
            </Table>
          </div>
        </Fragment>

        <UpdateOffer
          handleClose={handleClose}
          open={open}
          sentModalData={sentModalData}
        ></UpdateOffer>
      </div>
    </div>
    </>
  );
}

export default withStyles(styles)(ReduxForm);

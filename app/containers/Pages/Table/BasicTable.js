import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { PapperBlock } from "dan-components";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@mui/material/Button";
import UpdateInsurance from "../../../utils/UpdateInsurance";
import UpdateInsuranceForTraite from "../../../utils/UpdateInsuranceForTraite";

// try
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../Table/style.css";
// try

function BasicTable(props) {
  const { classes } = props;
  const title = brand.name + " - Assurance Utilisateur";
  const description = brand.desc;
  const [sentData, setSentData] = useState([]);
  const [users, setUsers] = useState([]);
  const [getDuplicates, setDuplicates] = useState([]);
  console.log(users);
  // console.log(sentData)
  useEffect(() => {
    fetch("https://app-optimumsolutions.ch/api/admin/assurance-get-for-all", {
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

  const [sentModalData, setSentModalData] = useState([]);
  // console.log(sentData)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openForTraiter, setOpenForTraiter] = React.useState(false);
  const handleOpenForTraiter = () => setOpenForTraiter(true);
  const handleCloseForTraiter = () => setOpenForTraiter(false);

  // api call for email
  const [userProfileData, setUserProfileData] = useState("");
  const email = localStorage.getItem("email");
  console.log(userProfileData);

  fetch(
    `https://app-optimumsolutions.ch/api/authentication/get-user-by-email/${email}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data?.data?.typeusers?.nomTypeUser);
      setUserProfileData(data?.data?.typeusers?.nomTypeUser);
    });

  //  Delete api
  const handleDeleteInsurance = (e) => {
    console.log(e);
    const proceed = window.confirm("Etes-vous sûr que vous voulez supprimer ?");
    if (proceed) {
      const url = `https://app-optimumsolutions.ch/api/contratassurance/delete/${e}`;
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
          title="Assurance utilisateur"
          whiteBg
          icon="ion-ios-menu-outline"
          desc="Gestion de l'assurance des utilisateurs"
        ></PapperBlock>

        <Fragment>
          <div style={{ display: "none" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">No.</TableCell>
                  <TableCell align="left">Nom</TableCell>
                  <TableCell align="left">Prénom</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Type d’assurance </TableCell>
                  <TableCell align="left">Compagnie</TableCell>
                  {/* <TableCell align="left">Signature</TableCell> */}
                  <TableCell align="left"> Montant</TableCell>
                  <TableCell align="left">operation</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow>
                    <TableCell align="left">{index + 1}</TableCell>

                    {userProfileData == "admin" ? (
                      <>
                        <TableCell
                          align="left"
                          style={{ cursor: "pointer", color: "#01b1da" }}
                          onClick={() =>
                            handleOpen(setSentModalData([user, 1]))
                          }
                        >
                          {user.user.nomUser}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{ cursor: "pointer", color: "#01b1da" }}
                          onClick={() =>
                            handleOpen(setSentModalData([user, 1]))
                          }
                        >
                          {user.user.prenomUser}
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell align="left">{user.user.nomUser}</TableCell>
                        <TableCell align="left">
                          {user.user.prenomUser}
                        </TableCell>
                      </>
                    )}

                    <TableCell align="left">{user.user.emailUser}</TableCell>
                    <TableCell align="left">
                      {user.packassurance.nomAssur}
                    </TableCell>
                    <TableCell align="left">
                      {user.packassurance?.compagnie?.nomCompagnie}
                    </TableCell>
                    {/* <TableCell align="left"><img src={user.signature} className="w3-left w3-circle w3-margin-right" width="100px" /></TableCell> */}
                    <TableCell align="left">{user.prixAssur}</TableCell>
                    <TableCell align="left">{user.operation}</TableCell>

                    <TableCell align="left">
                      {user?.operation == "Traité" ? (
                        <Button
                          onClick={() =>
                            handleOpenForTraiter(setSentModalData(user))
                          }
                        >
                          Voir le contrat
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
                      {user?.operation == "Traité" ? (
                        <Button
                          onClick={() => handleOpen(setSentModalData(user))}
                        >
                          Editer
                        </Button>
                      ) : (
                        <> </>
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
            <Table>
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
                          <TableCell align="left">No.</TableCell>
                          <TableCell align="left">Nom</TableCell>
                          <TableCell align="left">Prénom</TableCell>
                          <TableCell align="left">Email</TableCell>
                          <TableCell align="left">Type d’assurance </TableCell>
                          <TableCell align="left">Compagnie</TableCell>
                          {/* <TableCell align="left">Signature</TableCell> */}
                          <TableCell align="left"> Montant</TableCell>
                          <TableCell align="left">operation</TableCell>
                          <TableCell align="left">Action</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>

                    {Object.entries(userData).map(([key, value]) => (
                      <AccordionDetails>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell align="left">{key}</TableCell>

                              {userProfileData == "admin" ? (
                                <>
                                  <TableCell
                                    align="left"
                                    style={{
                                      cursor: "pointer",
                                      color: "#01b1da",
                                    }}
                                    onClick={() =>
                                      handleOpen(setSentModalData([value, 1]))
                                    }
                                  >
                                    {value?.user?.nomUser}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    style={{
                                      cursor: "pointer",
                                      color: "#01b1da",
                                    }}
                                    onClick={() =>
                                      handleOpen(setSentModalData([value, 1]))
                                    }
                                  >
                                    {value?.user?.prenomUser}
                                  </TableCell>
                                </>
                              ) : (
                                <>
                                  <TableCell align="left">
                                    {value?.user?.nomUser}
                                  </TableCell>
                                  <TableCell align="left">
                                    {value?.user?.prenomUser}
                                  </TableCell>
                                </>
                              )}
                              <TableCell align="left">
                                {value?.user?.emailUser}
                              </TableCell>

                              <TableCell align="left">
                                {value?.packassurance?.nomAssur}
                              </TableCell>
                              <TableCell align="left">
                                {value?.packassurance?.compagnie?.nomCompagnie}
                              </TableCell>
                              <TableCell align="left">
                                {value?.prixAssur}
                              </TableCell>
                              <TableCell align="left">
                                {value?.operation}
                              </TableCell>

                              <TableCell align="left">
                                {value?.operation == "Traité" ? (
                                  <Button
                                    onClick={() =>
                                      handleOpenForTraiter(
                                        setSentModalData(value)
                                      )
                                    }
                                  >
                                    Voir le contrat
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
                                {value?.operation == "Traité" ? (
                                  <Button
                                    onClick={() =>
                                      handleOpen(setSentModalData(value))
                                    }
                                  >
                                    Editer
                                  </Button>
                                ) : (
                                  <> </>
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
                          </TableBody>
                        </Table>
                      </AccordionDetails>
                    ))}
                  </Accordion>
                </div>
              ))}
            </Table>
          </div>
        </Fragment>
      </div>
      <UpdateInsurance
        handleClose={handleClose}
        open={open}
        sentModalData={sentModalData}
      ></UpdateInsurance>

      <UpdateInsuranceForTraite
        handleCloseForTraiter={handleCloseForTraiter}
        openForTraiter={openForTraiter}
        sentModalData={sentModalData}
      ></UpdateInsuranceForTraite>
    </>
  );
}

export default BasicTable;

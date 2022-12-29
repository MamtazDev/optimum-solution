import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "dan-components/Tables/tableStyle-jss";
import Button from "@mui/material/Button";
import UpdateUserInfo from "../../../utils/UpdateUserInfo";
import UserDetailsByGmail from "../../../utils/UserDetailsByGmail";
import { Link } from "react-router-dom";

function StrippedTable(props) {
  const { classes } = props;
  const { users } = props;
  console.log("users", users[0]);

  const [sentData, setSentData] = useState([]);
  // console.log(sentData)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openUserDetails, setOpenUserDetails] = React.useState(false);
  const handleOpenUserDetails = () => setOpenUserDetails(true);
  const handleCloseUserDetails = () => setOpenUserDetails(false);

  // delete api

  const handleDeleteInsurance = (e) => {
    console.log(e);
    const proceed = window.confirm("Etes-vous sûr que vous voulez supprimer ?");
    if (proceed) {
      const url = `https://app-optimumsolutions.ch/api/admin/user-deletion/${e}`;
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

  return (
    <>
      <Fragment>
        {/* className={(classes.table, classes.stripped)} */}
        <div className={classes.rootTable}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">No.</TableCell>

                <TableCell align="left">Nom </TableCell>
                <TableCell align="left">Prénom</TableCell>
                <TableCell align="left">Email</TableCell>

                <TableCell align="left">Adresse</TableCell>
                <TableCell align="left">Téléphone</TableCell>
                <TableCell align="left">Validité Adresse</TableCell>
                <TableCell align="left">Rôle</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow>
                  <TableCell align="left">{index + 1}</TableCell>
                  <TableCell
                    align="left"
                    onClick={() => handleOpenUserDetails(setSentData(user))}
                    style={{ cursor: "pointer", color: "#01b1da" }}
                  >
                    {user.nomUser}
                  </TableCell>
                  <TableCell
                    align="left"
                    // onClick={() => handleOpenUserDetails(setSentData(user))}
                    style={{ cursor: "pointer", color: "#01b1da" }}
                  >
                    <Link to="details">
                    {user.prenomUser}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{user.emailUser}</TableCell>

                  <TableCell align="left">{user.adrUser}</TableCell>
                  <TableCell align="left">{user.telUser}</TableCell>
                  <TableCell align="left">{user.validiteAdresse}</TableCell>
                  <TableCell align="left">
                    {user?.typeusers?.nomTypeUser}
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleOpen(setSentData(user))}>
                      Editer
                    </Button>

                    {/* <Button
             onClick={() => handleOpenUserDetails(setSentData(user))}
             
            >
              
              Editer
            </Button> */}
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
      </Fragment>

      <UpdateUserInfo
        handleClose={handleClose}
        open={open}
        sentData={sentData}
      ></UpdateUserInfo>

      <UserDetailsByGmail
        handleCloseUserDetails={handleCloseUserDetails}
        openUserDetails={openUserDetails}
        sentData={sentData}
      ></UserDetailsByGmail>
    </>
  );
}

StrippedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StrippedTable);

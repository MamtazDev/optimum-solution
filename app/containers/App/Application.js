import React, { useContext, useState } from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Templates/Dashboard";
import { ThemeContext } from "./ThemeWrapper";
import {
  Parent,
  DashboardPage,
  BlankPage,
  Form,
  Table,
  Error,
  NotFound,
} from "../pageListAsync";
import a from "../NewComponent/a";
import Details from "./Details";

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);

  const [userProfileData, setUserProfileData] = useState("");
  const email = localStorage.getItem("email");

  fetch(
    `https://app-optimumsolutions.ch/api/authentication/get-user-by-email/${email}`
  )
    .then((res) => res.json())
    .then((data) => {
      //  console.log(data?.data?.typeusers.nomTypeUser)
      setUserProfileData(data?.data?.typeusers.nomTypeUser);
    });

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        <Route exact path="/app" component={BlankPage} />
        <Route exact path="/app/blank-page" component={BlankPage} />
        <Route exact path="/app/user/details/:id" component={Details} />

        {/* <Route path="/app/pages/Utilisateurs" component={DashboardPage}/>  */}

        {userProfileData == "admin" ? (
          <Route path="/app/pages/Utilisateurs" component={DashboardPage} />
        ) : (
          <>
            <Route path="/app/pages/Offres" component={Form} />
            <Route path="/app/pages/Assurance" component={Table} />{" "}
          </>
        )}

        <Route path="/app/pages/Offres" component={Form} />
        <Route path="/app/pages/Assurance" component={Table} />

        {/* <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} /> */}

        <Route exact path="/app/pages" component={Parent} />

        {/* <Route exact path="/app/a" component={a} /> */}
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;

import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ResetForm } from 'dan-components';
import styles from '../../../components/Forms/user-jss';
import axios from 'axios';
import { useHistory } from "react-router-dom";

import ResetPasswordAfterCode from '../../../components/Forms/ResetPasswordAfterCode';


function ResetPasswordafterCodeComponent(props) {


  const [valueForm, setValueForm] = useState(null);
  const history = useHistory();



  const submitForm = useCallback((values) => {
    console.log(values)
    fetch("https://app-optimumsolutions.ch/api/authentication/set-new-password",{
        method: "POST",
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      }, values )

     .then((res) => {
     
      console.log(res)
      setTimeout(() => {
        
        history.push("/login");
        // console.log(`You submitted:\n\n${valueForm}`); // eslint-disable-line
      }, 500);
 


    });


    })

  const title = brand.name + ' - Reset Password';
  const description = brand.desc;
  const { classes } = props;


  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <ResetPasswordAfterCode onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

ResetPasswordafterCodeComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPasswordafterCodeComponent);

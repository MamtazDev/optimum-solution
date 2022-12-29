import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ResetForm } from 'dan-components';
import styles from '../../../components/Forms/user-jss';
import axios from 'axios';
import { useHistory } from "react-router-dom";


function ResetPassword(props) {
  const [valueForm, setValueForm] = useState(null);
  const history = useHistory();



  const submitForm = useCallback((values) => {
    console.log(values)
     axios.post("https://app-optimumsolutions.ch/api/forgot-password/get-passcode", values )
     .then((res) => {
     
      console.log(res)

      setValueForm(values);
      setTimeout(() => {
        
        history.push("/send-code");
        // console.log(`You submitted:\n\n${valueForm}`); // eslint-disable-line
      }, 500); // simulate server latency


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
          <ResetForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

ResetPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResetPassword);

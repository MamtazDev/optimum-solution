import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import brand from 'dan-api/dummy/brand';
import logo from '../../api/icons/Optimum Solutions SA-02 (1) - Copie.jpg';
import { TextFieldRedux } from './ReduxFormMUI';
import styles from './user-jss';
import { useHistory } from "react-router-dom";
import axios from 'axios';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

function SendCodeOtp(props) {


    const {
    classes,  
    handleSubmit,
    pristine,
    submitting,
    deco,
  } = props;




  return (
    <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
      <div className={classes.topBar}>
        <NavLink to="/" className={classes.brand}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </div>
      <Typography variant="h5" className={classes.title} gutterBottom>
      Réinitialiser le mot de passe
      </Typography>
      <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
      Envoyer un e-mail et un code
      </Typography>
      <section>
        <form onSubmit={handleSubmit}>
        
       <div>
        <FormControl className={classes.formControl}>
          <Field
            onChange={(e) => console.log(e.target.value)}
            name="emailUser"
            component={TextFieldRedux}
            placeholder="Votre mail"
            label="Votre mail"
            required
            validate={[required, email]}
            className={classes.field}
          />
          
        </FormControl>
      </div>

      <div>
        <FormControl className={classes.formControl}>
          <Field
            name="code"
            component={TextFieldRedux}
            placeholder="code"
            label="code"
            required
            // validate={[required, email]}
            className={classes.field}
          />
          
        </FormControl>
      </div>


          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="submit">
            Envoyer le code de réinitialisation
              <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
            </Button>
          </div>
        </form>
      </section>
    </Paper>
  );
}

SendCodeOtp.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const SendCodeOtpReduxed = reduxForm({
  form: 'resetFrm',
  enableReinitialize: true,
})(SendCodeOtp);

const RegisterFormMapped = connect(
  state => ({
    deco: state.ui.decoration
  }),
)(SendCodeOtpReduxed);

export default withStyles(styles)(RegisterFormMapped);

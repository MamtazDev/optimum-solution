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

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

function ResetPasswordAfterCode(props) {
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
      {/* <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
        Send reset password link to Your email
      </Typography> */}
      <section className={classes.formWrap}>
        <form onSubmit={handleSubmit}>
        
     

      <div>
        <FormControl className={classes.formControl}>
          <Field
            name="newPassword"
            component={TextFieldRedux}
            placeholder="nouveau mot de passe"
            label="nouveau mot de passe"
            required
            // validate={[required, email]}
            className={classes.field}
            type="password
            "
          />
          
        </FormControl>
      </div>


          <div className={classes.btnArea}>
            <Button variant="contained" color="primary" type="submit">
            réinitialiser le mot de passe
              <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
            </Button>
          </div>
        </form>
      </section>
    </Paper>
  );
}

ResetPasswordAfterCode.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const ResetPasswordAfterCodeReduxed = reduxForm({
  form: 'resetFrm',
  enableReinitialize: true,
})(ResetPasswordAfterCode);

const RegisterFormMapped = connect(
  state => ({
    deco: state.ui.decoration
  }),
)(ResetPasswordAfterCodeReduxed);

export default withStyles(styles)(RegisterFormMapped);

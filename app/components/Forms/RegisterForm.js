import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AllInclusive from '@material-ui/icons/AllInclusive';
import Brightness5 from '@material-ui/icons/Brightness5';
import People from '@material-ui/icons/People';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
// import logo from 'dan-images/logo.svg';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';
import logo from '../../api/icons/App store icone.png';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined
);

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.password) {
    return 'Passwords dont match';
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, value) => {
    setTab(value);
  };

  const {
    classes,
    handleSubmit,
    pristine,
    submitting,
    deco
  } = props;
  return (
    <Fragment>
      <Hidden mdUp>
        <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
          <img src={logo} alt={brand.name} />
          {brand.name}
        </NavLink>
      </Hidden>
      <Paper className={classNames(classes.paperWrap, deco && classes.petal)}>
        <Hidden smDown>
          <div className={classes.topBar}>
            <NavLink to="/" className={classes.brand}>
              <img src={logo} alt={brand.name} />
              {brand.name}
            </NavLink>
            <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
              <Icon className={classes.icon}>arrow_forward</Icon>
              Vous avez déjà un compte ?
            </Button>
          </div>
        </Hidden>
        <Typography variant="h5" className={classes.title} gutterBottom>
        S'inscrire
        </Typography>
        {/* <Typography variant="caption" className={classes.subtitle} gutterBottom align="center">
          Lorem ipsum dolor sit amet
        </Typography> */}
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          centered
          className={classes.tab}
        >
          <Tab label="Avec e-mail" />
          {/* <Tab label="With Social Media" /> */}
        </Tabs>
        {tab === 0 && (
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="nomUser"
                    component={TextFieldRedux}
                    placeholder="nomUser"
                    label="nomUser"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="prenomUser"
                    component={TextFieldRedux}
                    placeholder="prenomUser"
                    label="prenomUser"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="birthdayUser"
                    component={TextFieldRedux}
                    placeholder="YY/MM/DD"
                    label="birthdayUser"
                    required
                    // type="date"
                    className={classes.field}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="nationalityUser"
                    component={TextFieldRedux}
                    placeholder="nationalityUser"
                    label="nationalityUser"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="adrUser"
                    component={TextFieldRedux}
                    placeholder="adrUser"
                    label="adrUser"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>


              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="postalUser"
                    component={TextFieldRedux}
                    placeholder="postalUser"
                    label="postalUser"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="localityUser"
                    component={TextFieldRedux}
                    placeholder="localityUser"
                    label="localityUser"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="codeCounsellor"
                    component={TextFieldRedux}
                    placeholder="codeCounsellor"
                    label="codeCounsellor"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="telUser"
                    component={TextFieldRedux}
                    placeholder="telUser"
                    label="telUser"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="emailUser"
                    component={TextFieldRedux}
                    placeholder="emailUser"
                    label="emailUser"
                    required
                    validate={[required, email]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="passwordUser"
                    component={TextFieldRedux}
                    type="passwordUser"
                    label="passwordUser"
                    required
                    // validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div>


              {/* <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="passwordConfirm"
                    component={TextFieldRedux}
                    type="password"
                    label="Re-type Password"
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div> */}

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="photoUser"
                    component={TextFieldRedux}
                    placeholder="photoUser"
                    label="photoUser"
                    required
                    
                    className={classes.field}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="validiteAdresse"
                    component={TextFieldRedux}
                    placeholder="validiteAdresse"
                    label="validiteAdresse"
                    required
                    
                    className={classes.field}
                  />
                </FormControl>
              </div>


              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="typeusers"
                    component={TextFieldRedux}
                    placeholder="typeusers"
                    label="typeusers"
                    required
                    
                    className={classes.field}
                  />
                </FormControl>
              </div>

              {/* <div>
                <FormControlLabel
                  control={(
                    <Field name="checkbox" component={CheckboxRedux} required className={classes.agree} />
                  )}
                  label="Agree with"
                />
                <a href="#" className={classes.link}>Terms &amp; Condition</a>
              </div> */}
              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit">
                Continuer
                  <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)} disabled={submitting || pristine} />
                </Button>
              </div>
            </form>
          </section>
        )}
        {tab === 1 && (
          <section className={classes.socmedFull}>
            <Button fullWidth variant="outlined" size="large" className={classes.redBtn} type="button">
              <AllInclusive className={classNames(classes.leftIcon, classes.iconSmall)} />
              Socmed 1
            </Button>
            <Button fullWidth variant="outlined" size="large" className={classes.blueBtn} type="button">
              <Brightness5 className={classNames(classes.leftIcon, classes.iconSmall)} />
              Socmed 2
            </Button>
            <Button fullWidth variant="outlined" size="large" className={classes.cyanBtn} type="button">
              <People className={classNames(classes.leftIcon, classes.iconSmall)} />
              Socmed 3
            </Button>
          </section>
        )}
      </Paper>
    </Fragment>
  );
}

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: 'registerForm',
  enableReinitialize: true,
})(RegisterForm);

const RegisterFormMapped = connect(
  state => ({
    deco: state.ui.decoration
  }),
)(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);

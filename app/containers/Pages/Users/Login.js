import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import axios from 'axios';
import SnackbarComponent from '../../../utils/Snackbar';
// import Cookies from 'universal-cookie';


function Login(props) {
  const [valueForm, setValueForm] = useState(null);
  // console.log(valueForm)

  // const cookies = new Cookies();
  const clickRef = useRef()

  const submitForm = values => {
     // simulate server latency
     console.log("value", values)
    //  console.log(cookies.get('myCat'));

     const newVal = {

      
        // "emailUser": "xmedprod@gmail.com",
        // "passwordUser": "Suisse1@@"
    
        // emailUser: "xmedprod@gmail.com",
        // passwordUser: "Suisse1@@",
        passwordUser: localStorage.getItem("numnnn"),

      emailUser: localStorage.getItem("emaila"),
      // passwordUser: cookies.get('myCat'),
      remember:false

     }

     if(!values.email && !values.password){ values = newVal}

    //  console.log("values bitore: ", values)
    //     axios.post("https://app-optimumsolutions.ch/api/authentication/login", values )
    //     .then((res) => {
    //       console.log('res',res.data.token);
    //       setTimeout(() => {
    //         setValueForm(values);
    //         console.log(`You submitted:\n\n${valueForm}`);
    //         window.location.href = '/app/pages/Assurance';
    //       }, 500);
    //       localStorage.setItem('token', res.data.token);
    //       localStorage.setItem('email', values.emailUser);
        
    // // console.log(values.emailUser)

    //     }).catch(err => {
    //       clickRef.current.click()
    //       console.log(err)
    //       // alert("please check email and password")
    //     });
      
    

   setTimeout(() => {
        console.log("values bitore: ", values)
        axios.post("https://app-optimumsolutions.ch/api/authentication/login", values )
        .then((res) => {
          console.log('res',res.data.token);
          setTimeout(() => {
            setValueForm(values);
            console.log(`You submitted:\n\n${valueForm}`);
            window.location.href = '/app/pages/Assurance';
          }, 500);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('email', values.emailUser);
        
    // console.log(values.emailUser)

        }).catch(err => {
          clickRef.current.click()
          console.log(err)
          // alert("please check email and password")
        });
   }, 100)
      
      
    };
    
    const title = brand.name + ' - Login';
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
    <div >
      <SnackbarComponent clickRef = {clickRef}/>
    </div>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LoginForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);

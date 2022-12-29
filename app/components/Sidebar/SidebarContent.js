import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import brand from 'dan-api/dummy/brand';
import dummy from 'dan-api/dummy/dummyContents';
import logo from '../../api/icons/Optimum Solutions SA-02 (1) - Copie.jpg';
import logo2 from '../../api/icons/App store icone.png';
import MainMenu from './MainMenu';
import styles from './sidebar-jss';
import { Box } from '@material-ui/core';

function SidebarContent(props) {
  const [transform, setTransform] = useState(0);

  const handleScroll = (event) => {
    const scroll = event.target.scrollTop;
    setTransform(scroll);
  };

  useEffect(() => {
    const mainContent = document.getElementById('sidebar');
    mainContent.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const {
    classes,
    turnDarker,
    drawerPaper,
    toggleDrawerOpen,
    loadTransition,
    leftSidebar,
    dataMenu,
    status,
    anchorEl,
    openMenuStatus,
    closeMenuStatus,
    changeStatus,
    isLogin
  } = props;

  const setStatus = st => {
    switch (st) {
      case 'online':
        return classes.online;
      case 'idle':
        return classes.idle;
      case 'bussy':
        return classes.bussy;
      default:
        return classes.offline;
    }
  };



  
// const [userProfileData, setUserProfileData] = useState("")
// const email = localStorage.getItem('email');

// fetch(`https://app-optimumsolutions.ch/api/authentication/get-user-by-email/${email}`)
//         .then((res) => res.json())
//         .then((data) => {
//         //  console.log(data?.data)
//          setUserProfileData(data?.data)
//         });

  return (
    <div className={classNames(classes.drawerInner, !drawerPaper ? classes.drawerPaperClose : '')}>
      <div className={classes.drawerHeader}>
        <NavLink to="/app" className={classNames(classes.brand, classes.brandBar, turnDarker && classes.darker)}>
          <img src={logo} alt={brand.name} /> 
          {brand.name}
        </NavLink>
        {isLogin && (
          <div
            className={classNames(classes.profile, classes.user)}
            style={{ opacity: 1 - (transform / 100), marginTop: transform * -0.3 }}
            
          >
             <Avatar
              alt={dummy.user.name}
              src={logo2}
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
            <div >
             

            {/* <Box sx={{mt: 4, mb:5}}>           
              <span>{userProfileData?.nomUser}</span>
                        
              <span style={{marginLeft:" 5px"}}>{userProfileData?.prenomUser}</span>
             
        </Box> */}
              {/* <Button size="small" onClick={openMenuStatus}>
                <i className={classNames(classes.dotStatus, setStatus(status))} />
                {status}
              </Button>
              <Menu
                id="status-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenuStatus}
                className={classes.statusMenu}
              >
                <MenuItem onClick={() => changeStatus('online')}>
                  <i className={classNames(classes.dotStatus, classes.online)} />
                  Online
                </MenuItem>
                <MenuItem onClick={() => changeStatus('idle')}>
                  <i className={classNames(classes.dotStatus, classes.idle)} />
                  Idle
                </MenuItem>
                <MenuItem onClick={() => changeStatus('bussy')}>
                  <i className={classNames(classes.dotStatus, classes.bussy)} />
                  Bussy
                </MenuItem>
                <MenuItem onClick={() => changeStatus('offline')}>
                  <i className={classNames(classes.dotStatus, classes.offline)} />
                  Offline
                </MenuItem>
              </Menu> */}

              
            </div>
          </div>
        )}
      </div>
      <div
        id="sidebar"
        className={
          classNames(
            classes.menuContainer,
            leftSidebar && classes.rounded,
            isLogin && classes.withProfile
          )
        }
      >
        <MainMenu loadTransition={loadTransition} dataMenu={dataMenu} toggleDrawerOpen={toggleDrawerOpen} />
      </div>
    </div>
  );
}

SidebarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  drawerPaper: PropTypes.bool.isRequired,
  turnDarker: PropTypes.bool,
  toggleDrawerOpen: PropTypes.func,
  loadTransition: PropTypes.func,
  leftSidebar: PropTypes.bool.isRequired,
  dataMenu: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  anchorEl: PropTypes.object,
  openMenuStatus: PropTypes.func.isRequired,
  closeMenuStatus: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  isLogin: PropTypes.bool
};

SidebarContent.defaultProps = {
  turnDarker: false,
  toggleDrawerOpen: () => {},
  loadTransition: () => {},
  anchorEl: null,
  isLogin: true,
};

export default withStyles(styles)(SidebarContent);

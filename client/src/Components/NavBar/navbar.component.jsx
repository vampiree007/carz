import React from 'react';
import {useSelector,connect, useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Link, useLocation} from 'react-router-dom';
import {logoutUser} from '../../Redux/Users/users.actions';
const Logo = require('../../Assets/images/honda-256.ico')

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const location = useLocation();
  const path = location.pathname;

  const dispatch = useDispatch()

  let auth = false
  const user = useSelector(state => state.user.currentUser)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  if(user && user.active){
      auth = true
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(props.logoutUser);
    setAnchorEl(null);
    auth = false;
  };
  const toggleSidebar = () => {
    const sidebar = document.getElementById('side_bar');
    if (sidebar) sidebar.classList.toggle('toggle_sidebar')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {
            path === '/admin' && 
              <IconButton onClick={()=>{toggleSidebar()}} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
              </IconButton>
          }
          <Typography variant="h6" className={classes.title}>
            <Link to="/cars">
              <img src={Logo} alt="logo" style={{width:'33px', marginTop:'10px', marginLeft:'4px'}} />
            </Link>
          </Typography>
          {
            user && user.role ==='admin' ?
            <Link to={'/admin'}> 
            <AccountCircle style={{color:'#fff', fontSize:'30px', marginTop:'5px', marginRight:'5px'}} /> 
            </Link> : null
          }
          {auth ?
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <ExitToAppOutlinedIcon style={{fontSize:'30px'}} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => handleClose()}>logout</MenuItem>
              </Menu> 
            </div> : null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapDispatchToProps = {logoutUser}
export default connect(null, mapDispatchToProps)(NavBar)
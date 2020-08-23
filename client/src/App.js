import React,{useEffect} from 'react';
import { connect, useDispatch } from "react-redux";
import { Route, Switch, Redirect} from "react-router-dom";
import AuthCheck from './hoc/authCheck';
import Website from './Components/website.Page';
import NavBar from './Components/NavBar/navbar.component';
import Dashboard from './Admin_Components/dashboard.page';
import Login from './Components/Authentication/login/login.component';
import Signup from './Components/Authentication/signup/signup.component';
import {auth} from './Redux/Users/users.actions';

function App(props) {
  const {auth} = props
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(auth()).then(async res=> await res.payload)  
  }, [dispatch, auth]);

  return (
    <div className="App">
          <NavBar/>
          <Switch>
            <Route exact path={`/admin`} component={AuthCheck(Dashboard, true)} />
            <Route exact path={`/cars`} component={AuthCheck(Website, true)} />
            <Route exact path={`/login`} component={AuthCheck(Login, false)} />
            <Route exact path={`/register`} component={Signup} />
            <Redirect from='/' to="/cars" />
          </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.user.currentUser
});

const mapDispatchToProps = { auth };

export default connect(mapStateToProps, mapDispatchToProps)(App);

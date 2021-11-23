import * as React from 'react'
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {createBrowserHistory} from 'history'

import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";

import {  ThemeProvider } from '@mui/material/styles';
import {mdTheme} from './components//UI/CustomTheme'
import Login from './components/Login';
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard';
import Equipment from './components/Equipment';
import Sidebar from './components/UI/Sidebar'
import UserRequest from './components/UserRequest'
import EditUser from './components/EditUser'
import CreateEquipment from './components/CreateEquipment';
import EditEquipment from './components/EditEquipment';
import ApiRequest from './components/ApiRequest';


function App() {
  
 const history = createBrowserHistory();
 const [ isAuth, setIsAuth] = React.useState(Cookies.get('jwt'));


const checkData = () => {
    const jwt = jwt_decode(isAuth);
    console.log(jwt.role);
    if(jwt.role === 'admin') return jwt;
}

  return (
      <ThemeProvider theme = {mdTheme}>
    <Router>
    <div className="App">
      <Route path ="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp}/>
      { isAuth && 
        <React.Fragment>
      <Route exact path="/" render={() => { return  checkData() ? (<Dashboard/>) : (<Redirect to ='/api/users' />) }} />
      {history.location.pathname !== '/signup' && history.location.pathname !== '/login'  && <div><Sidebar/></div>}
      <Route exact path="/equipment" render={() => { return checkData() ? (<Equipment/>) : (<Redirect to ='/api/users'/>)}}/>
      <Route path="/api/view" render ={() => {return checkData() ? (<UserRequest/>) : (<Redirect to ='/api/users'/>)}}/>
      <Route path='/user/:id'  render = {() => {return checkData() ? (<EditUser/>) : (<Redirect to ='/api/users'/>)}}/>
      <Route path='/add'  render = {() => {return checkData() ? (<CreateEquipment/>) : (<Redirect to ='/api/users'/>)} }/>
      <Route path='/equipment/:id' render= {() => {return checkData() ? (<EditEquipment/>) : (<Redirect to ='/api/users'/>)}} />
      <Route exact path ='/api/users'  component={ApiRequest}/>
        </React.Fragment>
      }
      {!isAuth && history.location.pathname !== '/signup' && <Redirect to = {'/login'}/>}
    </div>
    </Router>
      </ThemeProvider>
  );
}



export default App;

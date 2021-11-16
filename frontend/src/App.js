import * as React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history'

import {  ThemeProvider } from '@mui/material/styles';


import {mdTheme} from './components//UI/CustomTheme'
import Login from './components/Login';
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard';
import Equipment from './components/Equipment';
import AppBar from './components/UI/AppBar'
import Sidebar from './components/UI/Sidebar'
import UserRequest from './components/UserRequest'
import EditUser from './components/EditUser'
import CreateEquipment from './components/CreateEquipment';
import EditEquipment from './components/EditEquipment';
import ViewUser from './components/ViewUser';
import ApiRequest from './components/ApiRequest';




function App() {

  const history = createBrowserHistory();
 
  return (
      <ThemeProvider theme = {mdTheme}>
    <Router>
    <div className="App">
      <Route path ="/login" exact component={Login} />
      <Route path="/signup" component={SignUp}/>
      <Route path="/" exact component={Dashboard}/>
      {history.location.pathname !== '/signup' && history.location.pathname !== '/login'  && <div><AppBar/><div><Sidebar/></div></div>}
      <Route path="/equipment" exact component={Equipment}/>
      <Route path="/api/req" component={UserRequest}/>
      <Route path='/user/:id' exact component={EditUser}/>
      <Route path='/add' exact component = {CreateEquipment}/>
      <Route path='/equipment/:id'  component ={EditEquipment}/>
      <Route path='/user/:id/equipment' exact component ={ViewUser}/>
      <Route path ='/api/req' exact component={ApiRequest}/>
    </div>
    </Router>
      </ThemeProvider>
  );
}

export default App;

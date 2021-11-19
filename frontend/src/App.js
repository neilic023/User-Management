import * as React from 'react'
import {BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import {createBrowserHistory} from 'history'

import Cookies from 'js-cookie';

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

  return (
      <ThemeProvider theme = {mdTheme}>
    <Router>
    <div className="App">
      <Route path ="/login" exact component={Login} />
      <Route path="/signup" component={SignUp}/>
      { isAuth && 
        <React.Fragment>
      <Route path="/" exact component={Dashboard}/>
      {history.location.pathname !== '/signup' && history.location.pathname !== '/login'  && <div><Sidebar/></div>}
      <Route path="/equipment" exact component={Equipment}/>
      <Route path="/api/view" component={UserRequest}/>
      <Route path='/user/:id' exact component={EditUser}/>
      <Route path='/add' exact component = {CreateEquipment}/>
      <Route path='/equipment/:id'  component ={EditEquipment}/>
      <Route path ='/api/users' exact component={ApiRequest}/>
        </React.Fragment>
      }
      {!isAuth && <Redirect to = {'/login' || '/signup'}/>}
    </div>
    </Router>
      </ThemeProvider>
  );
}

export default App;

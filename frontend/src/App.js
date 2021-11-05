import * as React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createBrowserHistory} from 'history'

import {  ThemeProvider } from '@mui/material/styles';
import {mdTheme} from './components/CustomTheme'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard';
import Equipment from './components/Equipment';
import AppBar from './components/AppBar'
import Sidebar from './components/Sidebar'





function App() {

  const history = createBrowserHistory();
 
  return (
      <ThemeProvider theme = {mdTheme}>
    <Router>
    <div className="App">
      <Route path ="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp}/>
      
      <Route path="/users" component={Dashboard}/>
      {history.location.pathname !== '/signup' && history.location.pathname !== '/'  && <div><AppBar/> <div><Sidebar/></div></div>}
      <Route path="/equipment" component={Equipment}/>
    </div>
    </Router>
      </ThemeProvider>
  );
}

export default App;

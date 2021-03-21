import './App.css';
import React from 'react';
import TableComponent from './components/TableComponent';
import AppBarComponent from './components/AppBarComponent';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Inventory from './routes/Inventory';
import {
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return (
  <div className="App">
    <AppBarComponent/>

    <header className="App-header">
      <Switch>
        <Route exact path="/" component={TableComponent}/>
        <Route path="/inventory" component={Inventory}/>
        <Route path="/login" component={Login}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </header>
   </div>
  );
  
}

export default App;

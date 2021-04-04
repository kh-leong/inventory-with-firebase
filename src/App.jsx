import './App.css';
import React from 'react';
import AppBarMain from './components/AppBarMain';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Inventory from './routes/Inventory';
import Profile from './routes/Profile';
import Home from './routes/Home';
import {
  Switch,
  Route,
} from "react-router-dom";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '@react-firebase/auth';

const App = () => {
  return (
  <div className="App">
    <AppBarMain/>

    <header className="App-header">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/inventory" component={Inventory}/>
        <Route path="/login" component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/manage_inventory">
          <IfFirebaseAuthed>
            {() => { return (
              <Inventory type="admin"/>
            )}}
          </IfFirebaseAuthed>
          <IfFirebaseUnAuthed>
            {() => { return (
              <NotFound/>
            )}}
          </IfFirebaseUnAuthed>
        </Route>
        <Route path="*" component={NotFound}/>
      </Switch>
    </header>
   </div>
  );
  
}

export default App;

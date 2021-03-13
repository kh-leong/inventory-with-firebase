import './App.css';
import React from 'react';
import TableComponent from './components/TableComponent';
import AppBarComponent from './components/AppBarComponent';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import {
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
    <div className="App">
      <AppBarComponent/>

      <header className="App-header">
        <Switch>
          <Route exact path="/" component={TableComponent}/>
          <Route path="/list" component={TableComponent}/>
          <Route path="/login" component={Login}/>
          <Route path="*" component={NotFound}/>
        </Switch>
      </header>
     </div>
    );
  }
}

export default App;

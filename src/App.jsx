import './App.css';
import React from 'react';
import TableComponent from './components/TableComponent';
import AppBarComponent from './components/AppBarComponent';
import Login from './routes/Login';
import {
  BrowserRouter as Router,
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
        </Switch>
      </header>
     </div>
    );
  }
}

export default App;

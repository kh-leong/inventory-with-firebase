import './App.css';
import React from 'react';
import TableComponent from './components/TableComponent';
import AppBarComponent from './components/AppBarComponent';

class App extends React.Component {
  render() {
    return (
    <div className="App">
      <AppBarComponent/>

      <header className="App-header">
        <TableComponent/>
      </header>
     </div>
    );
  }
}

export default App;

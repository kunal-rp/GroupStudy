import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SideBar from './sidebar'
import MainWindow from './main_window';
class App extends Component {
constructor(props) {
  super(props);
  this.state = {
    subscribed_groups: [
      'cs130',
      'cs408',
      'cs500'
    ] 
  }
}

  render() {
    return (
      <div className="App">
        <SideBar />
        <MainWindow />
      </div>
    );
  }
}

export default App;

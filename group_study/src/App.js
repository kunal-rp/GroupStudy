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
      ], 
      subjects: [
        {
          subject_name: "Computer Science",
          courses: ['CS 130', 'CS 356', 'CS 480']
        }
        ,{
          subject_name: "Math",
          courses: ['MA 156', 'MA 456', 'MA 460']
        }
      ]    
  }
}

  render() {
    return (
      <div className="App">
        <SideBar subscribed_groups={this.state.subscribed_groups} />
        <MainWindow />
      </div>
    );
  }
}

export default App;

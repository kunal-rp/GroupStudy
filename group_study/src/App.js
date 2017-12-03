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
          courses: ['CS 140', 'CS 356', 'CS 480']
        }
        ,{
          subject_name: "Math",
          courses: ['MA 156', 'MA 456', 'MA 460']
        }
      ]    
  }

  this.handleSubscribeGroups = this.handleSubscribeGroups.bind(this);
}

  handleSubscribeGroups= (group)=>{
  //  handleSubscribeGroups(group){
    console.log('pressed in the window');
    this.setState({
      subscribed_groups: this.state.subscribed_groups.concat(group)
    });
    console.log('this.state.subscribed_groups' +this.state.subscribed_groups);
  };

  render() {
    return (
      <div className="App">
        <SideBar subscribed_groups={this.state.subscribed_groups} />
        <MainWindow subjects={this.state.subjects} handleSubscribeGroups={() => this.handleSubscribeGroups} />
      </div>
    );
  }
}

export default App;

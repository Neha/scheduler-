import React, {Component} from 'react';
import logo from '../logo.svg';
import '../App.css';
import Login from './Login.js';
import List from './List.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import token from "../token";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

  }
  saveUserInfo = (userInfo) => {
    this.setState({userInfo: userInfo});
    window.sessionStorage.setItem("user", JSON.stringify(userInfo.data));
    this
      .props
      .history
      .push('/list');

  }

  render() {
    return (
      <div className="App">
        <Route
          path="/login"
          component={() => {
          return <Login saveUserInfo={this.saveUserInfo}/>
        }}/>

        <Route
          path="/list"
          component={() => {
          if (!token()) {
            this
              .props
              .history
              .push('/login');
          }
          return <List userInfo={this.state.userInfo}/>
        }}/>

      </div>
    );
  }
}

export default App;
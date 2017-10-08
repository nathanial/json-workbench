import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import * as cxs from 'cxs';
import Sidebar from './Sidebar';

const sidebarClass = cxs({
  width: '100px',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  background: '#67AAF9'
});

const contentClass = cxs({
  position: 'absolute',
  left: '100px',
  top: 0,
  bottom: 0,
  right: 0
});

function EditPage(){
  return <h1>Edit Page</h1>
}

function SettingsPage(){
  return <h1>Settings Page</h1>;
}


export default class App extends Component {
  state = {
    selectedPage: 'Edit'
  }

  render() {
    return (
      <div className="app">
        <Sidebar selectedPage={this.state.selectedPage} onSelectedPageChanged={this.onSelectedPageChanged} />
        <div className={contentClass}>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  renderContent(){
    if(this.state.selectedPage === 'Edit'){
      return <EditPage />
    } else {
      return <SettingsPage />
    }
  }

  onSelectedPageChanged = (newSelection) => {
    this.setState({selectedPage: newSelection});
  }
}


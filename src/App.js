import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'codemirror/lib/codemirror.css';
import * as cxs from 'cxs';
import Sidebar from './Sidebar';
import EditPage from './EditPage';
import SettingsPage from './SettingsPage';

const contentClass = cxs({
  position: 'absolute',
  left: '100px',
  top: 0,
  bottom: 0,
  right: 0
});

const progressSpinnerClass = cxs({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginLeft: '-50px',
  marginTop: '-50px'
});


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

  renderProgressBar() {
    return (
      <svg className={progressSpinnerClass} x="0px" y="0px" width="100px" height="100px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40">
        <path opacity="0.1" fill="#000" d={`M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z`}/>
        <path fill="#2384F6" d={`M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
           C22.32,8.481,24.301,9.057,26.013,10.047z`}>
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.75s"
            repeatCount="indefinite" />
        </path>
      </svg> 
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


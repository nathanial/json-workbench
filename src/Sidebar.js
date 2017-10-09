import React, { Component } from 'react';
import * as cxs from 'cxs';
import {Button, Nav, NavItem, NavLink} from 'reactstrap';
import * as color from 'color';
import PropTypes from 'prop-types';

const sidebarColor = '#67AAF9';
const hoverColor = color(sidebarColor).darken(0.1).hex();
const selectedColor = color('#598AC4').darken(0.2).hex();

const sidebarClass = cxs({
  width: '100px',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  background: sidebarColor
});

const linkClass = cxs({
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  padding: '20px 15px',
  ':hover': {
    background: hoverColor,
    color: 'white'
  },
  ':active': {
    background: selectedColor,
  }
})

const selectedLinkClass = cxs({
  color: 'white !important',
  background: selectedColor,
  ':hover': {
    background: selectedColor,
  },
});

const titleClass = cxs({
  color: 'white',
  textAlign: 'center',
  fontSize:'11px',
  margin: '5px 10px',
  display: 'block'
});

export default class Sidebar extends React.Component {
  static propTypes = {
    selectedPage: PropTypes.string.isRequired,
    onSelectedPageChanged: PropTypes.func.isRequired
  };
  render(){
    return (
      <div className={sidebarClass}>
        <Nav vertical>
          <NavItem style={{marginTop: 10}}>
            <img style={{marginLeft: '12px'}} width="75px" height="75px" src="icons/Toolbox Logo.svg" />
            <p className={titleClass}>JSON Workbench</p>
          </NavItem>
          <NavItem style={{marginTop:'50px'}}>
            {this.renderNav("Edit", "icons/Edit.png")}
          </NavItem>
          <NavItem style={{position: 'absolute', bottom: 0,left:0,right:0}}>
            {this.renderNav("Settings", "icons/Settings.svg")}
          </NavItem>
        </Nav>
      </div>
    );  
  }

  renderNav(name, image){
    let classes = linkClass;
    if(this.props.selectedPage === name){
      classes += ' ' + selectedLinkClass;
    }
    
    return (
      <NavLink onClick={() => this.props.onSelectedPageChanged(name)} className={classes}>
        <img width="35px" height="35px" src={image} style={{color:'white', position: 'relative', left: '15px'}} />
      </NavLink>
    );
  }
}
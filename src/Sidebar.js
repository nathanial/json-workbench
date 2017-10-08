import React, { Component } from 'react';
import * as cxs from 'cxs';
import {Button, Nav, NavItem, NavLink} from 'reactstrap';
import * as color from 'color';
import PropTypes from 'prop-types';

const sidebarColor = '#67AAF9';
const hoverColor = color(sidebarColor).darken(0.1).hex();
const selectedColor = color(sidebarColor).darken(0.2).hex();

const sidebarClass = cxs({
  width: '100px',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  background: sidebarColor
});

console.log("Sidebar Color", sidebarColor);
console.log("Hover Color", hoverColor);

const linkClass = cxs({
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
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

export default class Sidebar extends React.Component {
  static propTypes = {
    selectedPage: PropTypes.string.isRequired,
    onSelectedPageChanged: PropTypes.func.isRequired
  };
  render(){
    return (
      <div className={sidebarClass}>
        <Nav vertical>
          <NavItem>
            {this.renderNav("Edit")}
          </NavItem>
          <NavItem>
            {this.renderNav("Settings")}
          </NavItem>
        </Nav>
      </div>
    );  
  }

  renderNav(name){
    if(this.props.selectedPage === name){
      return (
        <NavLink onClick={() => this.props.onSelectedPageChanged(name)} className={linkClass + ' ' + selectedLinkClass}>{name}</NavLink>
      );
    }
    return (
      <NavLink onClick={() => this.props.onSelectedPageChanged(name)} className={linkClass} href="#">{name}</NavLink>    
    );
  }
}
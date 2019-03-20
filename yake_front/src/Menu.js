import React, { Component } from 'react';
import './Menu.css';
import {Link} from 'react-router-dom';
class Menu extends Component {
  render() {
    return (
      <Link onClick={()=>{if(this.props.onClick!==undefined)this.props.onClick();}} to={this.props.to} style={{textDecoration:'none',color:'white'}} className={`MenuBarre${this.props.clicable?"Clicable":""}`}>
        {
            this.props.value
        }
      </Link>
    );
  }
}

export default Menu;
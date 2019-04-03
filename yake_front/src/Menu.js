import React, { Component } from 'react';
import './Menu.css';
import {Link} from 'react-router-dom';
class Menu extends Component {
  
  render() {
    let menu;
    if(this.props.clicable){
      menu = (<Link onClick={()=>{if(this.props.onClick!==undefined)this.props.onClick();}} to={this.props.to} style={{textDecoration:'none'}} className={`MenuBarre${this.props.clicable?"Clicable":""}`}>
      {
          this.props.value
      }
    </Link>);
    }
    else{
      menu = (<div onClick={()=>{if(this.props.onClick!==undefined)this.props.onClick();}} className={`MenuBarre${this.props.clicable?"Clicable":""}`}>
      {
          this.props.value
      }
    </div>);
    }
    return (
      menu
    );
  }
}

export default Menu;
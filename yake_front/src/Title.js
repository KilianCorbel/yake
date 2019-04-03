import React, { Component } from 'react';
import './Title.css';
import './Menu.css';
import {Link} from 'react-router-dom';
class Title extends Component {
  render() {
    return (
      <Link onClick={()=>{if(this.props.onClick!==undefined)this.props.onClick();}} to="/" style={{textDecoration:'none',color:'white'}} className="Titre">
        <h1>Yake</h1>
      </Link>
    );
  }
}

export default Title;
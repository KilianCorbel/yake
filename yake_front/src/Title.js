import React, { Component } from 'react';
import './Title.css';
class Title extends Component {
  render() {
    return (
      <div onClick={()=>{this.props.onClick()}} className="Titre">
        <h1>Yake</h1>
      </div>
    );
  }

}

export default Title;
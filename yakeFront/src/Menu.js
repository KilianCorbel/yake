import React, { Component } from 'react';
import './Menu.css';
class Menu extends Component {
  render() {
    return (
      <div className="MenuBarre">
        {
            this.props.value
        }
      </div>
    );
  }
}

export default Menu;
import React, { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
class AutresWindow extends Component{
    render(){
        return(
        <div className="MainContent">
            <div className="scrollable">
                <p>{"Autres"}</p>
            </div>
        </div>
        );
    };
}
export default AutresWindow;
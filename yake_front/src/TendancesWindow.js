import React, { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
class TendancesWindow extends Component{
    render(){
        return(
        <div className="MainContent">
            <div className="scrollable">
                <p>{"Tendances"}</p>
            </div>
        </div>
        );
    };
}
export default TendancesWindow;
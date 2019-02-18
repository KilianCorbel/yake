import React, { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
class MusicWindow extends Component{
    render(){
        return(
        <div className="MainContent">
            <div className="scrollable">
                <p>{"MesMusiques"}</p>
            </div>
        </div>
        );
    };
}
export default MusicWindow;
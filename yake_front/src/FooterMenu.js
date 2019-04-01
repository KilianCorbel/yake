import React, { Component } from 'react';
import './Menu.css';

class FooterMenu extends Component {
    render() {
        return (
            <div className='MenuBarre'> 
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
        <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Muli" rel="stylesheet"></link>            
                <ul class="social-network social-circle">
                    <li><a href="http://localhost:3000" class="icoRss" title="Rss"><i class="fa fa-rss"></i></a></li>
                    <li><a href="http://localhost:3000" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="http://localhost:3000" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        );
    }
}

export default FooterMenu;
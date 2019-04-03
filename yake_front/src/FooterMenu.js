import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Menu.css';

class FooterMenu extends Component {
    render() {
        return (
            <div className='MenuBarre'>
                
                <ul class="social-network social-circle">
                    <li><a href="#" class="icoRss" title="Rss"><i class="fa fa-rss"></i></a></li>
                    <li><a href="#" class="icoFacebook" title="Facebook"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#" class="icoTwitter" title="Twitter"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div>
        );
    }
}

export default FooterMenu;
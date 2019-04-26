import React, { Component } from 'react';
import {  Input, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Menu from './Menu.js';
import './connectionPopOver.css';
class ConnectionPopOver extends Component{
    constructor(props){
        super(props);
        this.state = {
            popoverOpen: false,
            login : "",
            pass : ""
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
          popoverOpen: !this.state.popoverOpen
        });
    }
    
    login(){
        let header = new Headers({username : this.state.login,password : this.state.pass,date : new Date().getTime()});
        fetch('/api/utilisateur/user/connection',{
            method : 'GET',
            headers : header,
            mode: 'cors'
        })
        .then(data=>{if(!data.ok)throw Error("Incorrect Account"); return data.json();})
        .then(data=>{
            this.props.saveUser(data.pseudo,data.token);
            this.setState({login : "",pass : "",popoverOpen:false});
        })
        .catch(err=>{this.setState({login : "",pass : ""})});
    }

    updateLoginValue(evt) {
        this.setState({
          login: evt.target.value
        });
    }

    updatePassValue(evt) {
        this.setState({
          pass: evt.target.value
        });
    }

    render(){
        let display;
        if(this.props.token !== "" && this.props.pseudo !== ""){
            display = (
                <div style={{display : "flex", flex : "2 0 0"}}>
                    <Menu id="loginButton" clicable={true} value={`Bonjour ${this.props.pseudo}`} onClick={()=>this.toggle()}></Menu>
                    <Popover placement="bottom" isOpen={this.state.popoverOpen} target="loginButton" toggle={this.toggle} trigger="legacy">
                        <PopoverHeader className="connectionHeader"><br/></PopoverHeader>
                        <PopoverBody>
                            <Button onClick={()=>this.props.saveUser("","")}>Deconnexion</Button>
                        </PopoverBody>
                    </Popover>
                </div>)
        }
        else{
            display = (
                <div style={{display : "flex", flex : "2 0 0"}}>
                    <Menu id="loginButton" clicable={true} value="Connexion" onClick={()=>this.toggle()}></Menu>
                    <Popover placement="bottom" isOpen={this.state.popoverOpen} target="loginButton" toggle={this.toggle} trigger="legacy">
                        <PopoverHeader className="connectionHeader"><br/></PopoverHeader>
                        <PopoverBody>
                            <Input onChange={evt => this.updateLoginValue(evt)} type="text" placeholder="login" value={this.state.login}></Input>
                            <Input onChange={evt => this.updatePassValue(evt)} type="password" placeholder="password" value={this.state.pass}></Input>
                            <Button onClick={()=>this.login()}>Connexion</Button>
                        </PopoverBody>
                    </Popover>
                </div>)
        }
        return display;
    }

}

export default ConnectionPopOver;
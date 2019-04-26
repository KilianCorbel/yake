import React, { Component } from 'react';
import './noteBlock.css';
class NoteBlock extends Component{
    constructor(props){
        super(props);
        this.state={
            note : undefined,
            choosenNote : undefined
        }
        this.note = undefined;
        this.hoverStar = this.hoverStar.bind(this);
        this.leaveStar = this.leaveStar.bind(this);
    }

    componentDidMount(){
        this.setState({note : this.props.note})
    }

    sendNote(note){
        if(this.props.token !== undefined && this.props.token !== ""){
            if(note > 5)
                note = 5;
            let header = new Headers({token : this.props.token,"Content-Type": "application/json"});
            fetch('/api/Utilisateur/user/voteformusic',{
                method : 'POST',
                headers : header,
                mode: 'cors',
                body : JSON.stringify({
                    id : this.props.id,
                    idAlbum : this.props.idAlbum,
                    note : note,
                    idArtiste : this.props.idArtiste
                })
            }).then(data=>data.json())
            .then(data=>{/*this.note = data.note*/this.setState({note:data.note,choosenNote:undefined})})
            .catch(err=>console.log(err));
        }
    }

    hoverStar(note){/*
        if(this.props.connected){
            for(let i = 0;i<=6;i++){
                if(document.getElementById(`${i}${this.props.name}`) !== undefined){
                    document.getElementById(`${i}${this.props.name}`).classList.remove("starColored");
                }
            }
            for(let i = 0;i<=note;i++){
                if(document.getElementById(`${i}${this.props.name}`) !== undefined){
                    document.getElementById(`${i}${this.props.name}`).classList.add("starColored");
                }
            }
        }*/
        if(this.props.token !== undefined && this.props.token !== ""){
            this.setState({choosenNote:note});
        }
    }

    leaveStar(){
        /*if(this.props.connected){
            for(let i = 0;i<=6;i++){
                if(document.getElementById(`${i}${this.props.name}`) !== undefined){
                    document.getElementById(`${i}${this.props.name}`).classList.remove("starColored");
                    if(this.note !== undefined){
                        if(i<= this.note)
                            document.getElementById(`${i}${this.props.name}`).classList.add("starColored");
                    }
                    else if(this.props.note !== undefined && i <= this.props.note)
                        document.getElementById(`${i}${this.props.name}`).classList.add("starColored");
                }
            }
        }
        */
        if(this.props.token !== undefined && this.props.token !== ""){
            this.setState({choosenNote : undefined});
        }
    }

    render(){
        let stars = [];
        for(let i = 0;i<7;i++){
            if(i===0 || i === 6){
                stars.push(<div className="star" id={`${i}${this.props.name}`} key={`${this.props.id}${i}`} onClick={()=>this.sendNote(i)} onMouseOver={()=>this.hoverStar(i)} onMouseLeave={()=>this.leaveStar()}> </div>);
            }
            else{
                stars.push(<div className={`star ${((i<=this.state.note && this.state.choosenNote === undefined )|| i<=this.state.choosenNote)?"starColored":""}`} id={`${i}${this.props.name}`} key={`${this.props.id}${i}`} onClick={()=>this.sendNote(i)} onMouseOver={()=>this.hoverStar(i)} onMouseLeave={()=>this.leaveStar()}>♪</div>);
            }
        }
        return ( 
        <div className="starContainer">
                {stars}
        </div>);
    }
}

export default NoteBlock;
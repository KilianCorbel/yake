import React, { Component } from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';
class MusiquesBlock extends Component{
    initMusic(sound){
        this.props.playlist.initMusic(sound);
        this.props.refresh();
    }
    addNext(sound){
        this.props.playlist.addNext(sound);
        this.props.refresh();
    }
    render(){
        let musiqueList=[];
        if(this.props.musiques.length>0){
            musiqueList=this.props.musiques.map((ele)=>{
                let buttonAddNext;
                if(!this.props.playlist.isInitialised()){
                    buttonAddNext = (<Button color="secondary" size="sm" onClick={()=>{this.addNext(ele);}}>{"Add Next"}</Button>);
                }
                return(<div className="musicLine" key={`${ele.titre}`}>
                <div key={`${ele.titre}titre`}style={{textDecoration:'none',color:'black'}}>{ele.titre}</div>
                <Link to={`/showAlbum?id=${ele.idAlbum}`} key={`${ele.titre}album`}style={{textDecoration:'none',color:'black'}}>{ele.nomAlbum}</Link>
                <Link to={`/showArtiste?id=${ele.idGroupe}`} key={`${ele.titre}groupe`} style={{textDecoration:'none',color:'black'}}>{ele.nomGroupe}</Link>
                <Button color="secondary" size="sm" onClick={()=>{this.initMusic(ele);}}>{"Play"}</Button>
                {buttonAddNext}
                </div>);})
            musiqueList=(<div className="MusicList">{musiqueList}</div>);
        }
        return (musiqueList);
    }
}
export default MusiquesBlock;
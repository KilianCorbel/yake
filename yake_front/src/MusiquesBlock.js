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
                    buttonAddNext = (<Button key={`${ele.titre}addNextButton`} color="secondary" size="sm" onClick={()=>{this.addNext(ele);}} className="playNextMusicLine">{"Add Next"}</Button>);
                }
                return(
                <div key={`${ele.titre}mainDiv`} className='musicLineContent'>
                    <div className="musicLine" key={`${ele.titre}`}>
                        <div key={`${ele.titre}titre`}style={{textDecoration:'none',color:'black'}} className="titleMusicLine">{ele.titre}</div>
                        <Link to={`/showAlbum?id=${ele.idAlbum}`} key={`${ele.titre}album`}style={{textDecoration:'none',color:'black'}} className="albumMusicLine">{ele.nomAlbum}</Link>
                        <Link to={`/showArtiste?id=${ele.idGroupe}`} key={`${ele.titre}groupe`} style={{textDecoration:'none',color:'black'}} className="groupeMusicLine">{ele.nomGroupe}</Link>
                        <Button color="secondary" size="sm" onClick={()=>{this.initMusic(ele);}} className="playButtonMusicLine">{"Play"}</Button>
                        {buttonAddNext}
                    </div>
                </div>);})
            musiqueList=(<div className="MusicList">
                            <div className='headMusicLine'>
                                <div className="musicLine">
                                    <div className="titleMusicLine">Titre</div>
                                    <div className="albumMusicLine">Album</div>
                                    <div className="groupeMusicLine">Groupe</div>
                                </div>
                            </div>
                            <div className='headMusicLine'>
                                <div className="musicLine">
                                        <div className="titleMusicLine"><br/></div>
                                </div>
                            </div>
                            {musiqueList}
                        </div>);
        }
        return (musiqueList);
    }
}
export default MusiquesBlock;
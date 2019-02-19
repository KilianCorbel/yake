import React , { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
import { Button } from 'reactstrap';
class AlbumWindow extends Component{
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
        if(this.props.album.musiques.length>0){
            musiqueList=this.props.album.musiques.map((ele)=>{ele.nomAlbum=this.props.album.nom;ele.idAlbum=this.props.album._id;ele.nomGroupe=this.props.album.nomGroupe;ele.idGroupe=this.props.album.idGroupe;return ele;})
            musiqueList=musiqueList.map((ele)=>{
            if(this.props.playlist.isInitialised()){
                return(<div className="musicLine" key={`${ele.titre}`}>{`${ele.titre} ---- ${ele.nomAlbum} ---- ${ele.nomGroupe}`}
                <Button color="secondary" size="sm" onClick={()=>{this.initMusic(ele);}}>{"Play"}</Button>
                </div>);}
            else{
                return(<div className="musicLine" key={`${ele.titre}`}>{`${ele.titre} ---- ${ele.nomAlbum} ---- ${ele.nomGroupe}`}
                <Button color="secondary" size="sm" onClick={()=>{this.initMusic(ele);}}>{"Play"}</Button>
                <Button color="secondary" size="sm" onClick={()=>{this.addNext(ele);}}>{"Add Next"}</Button>
                </div>);}
            })
            musiqueList=(<div><h3>Musiques contenues dans cet album</h3><div className="MusicList">{musiqueList}</div></div>);
        }
        return(<div className="MainContent">
            <div className="scrollable">
                <div><h1>{`${this.props.album.nom}`}</h1><img src={`api/artistes/albums/stream/${this.props.album._id}`} alt="noImage" key={"album"}></img></div>
                {musiqueList}
            </div>
        </div>);
    }
}
export default AlbumWindow;
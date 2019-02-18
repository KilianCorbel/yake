import React, { Component } from 'react';
import './MainContent.css';
import { Button } from 'reactstrap';
class musiqueList extends Component{
    constructor(props){
        super(props);
        this.runMusic = this.runMusic.bind(this);
        this.toArrayBuffer=this.toArrayBuffer.bind(this);
        this.play=true;
        this.source=undefined;
        this.resume=0;
        this.context = undefined;
        this.beginningTime=0;
    }
    toArrayBuffer(buf) {
        var ab = new ArrayBuffer(buf.length);
        var view = new Uint8Array(ab);
        for (var i = 0; i < buf.length; ++i) {
            view[i] = buf[i];
        }
        return ab;
    }
    initMusic(sound){
        this.props.playlist.initMusic(sound);
        this.props.refresh();
    }
    addNext(sound){
        this.props.playlist.addNext(sound);
        this.props.refresh();
    }
    runMusic(sound){
        //console.log(this.play);
        //this.props.musicPlayer.addNext(sound);
        this.props.playlist.addNext(sound);
        this.props.refresh();
        //this.props.musicPlayer.next();
    }
    render(){
        let musiqueList=[];
        let albumList=[];
        let artisteList=[];
        if(this.props.musiqueList.length>0){
            musiqueList=this.props.musiqueList.map((ele)=>{
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
            musiqueList=(<div><h3>Liste de musique</h3><div>{musiqueList}</div></div>);
        }
        if(this.props.albumList.length>0){
            albumList=this.props.albumList.map((ele)=>{

                    return(<div className="musicLine" key={`${ele.nom}`}>{`${ele.nom}`}
                    </div>);}
                )
                albumList=(<div><h3>{"Liste d'album"}</h3><div>{albumList}</div></div>);
        }
        if(this.props.artisteList.length>0){
            artisteList=this.props.artisteList.map(ele=>{
                return(<div className="musicLine" key={`${ele.nom}`}>{`${ele.nom}`}
                    </div>);
            });
            artisteList=(<div><h3>{"Liste d'Artistes"}</h3><div>{artisteList}</div></div>);
        }
        return <div className="MainContent">
                {musiqueList}
                {albumList}
                {artisteList}

        </div>
    }
}
export default musiqueList;
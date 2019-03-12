import React, { Component } from 'react';
import { Button } from 'reactstrap';
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
            musiqueList=(<div className="MusicList">{musiqueList}</div>);
        }
        return (musiqueList);
    }
}
export default MusiquesBlock;
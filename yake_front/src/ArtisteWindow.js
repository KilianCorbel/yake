import React , { Component } from 'react';
import './MainContent.css';
import './Scrollable.css';
class ArtisteWindow extends Component{
    render(){
        let albumList=[];
        if(this.props.artiste.albums.length>0){
            albumList=this.props.artiste.albums.map((ele)=>{

                    return(<div className="albumRow" key={`${ele.nom}`} onClick={()=>{this.props.onAlbumClick(ele._id)}}>
                    <div className="albumRowContentimg"><img height="100" width="100" src={`api/artistes/albums/stream/${ele._id}`} alt="noImage"/></div>
                    <div className="albumRowContent">{`${ele.nom}`}</div>
                    </div>);}
                )
                albumList=(<div className="AlbumList"><h3>{"Albums publiés par cet auteur"}</h3><div className="AlbumRows">{albumList}</div></div>);
        }
        return(<div className="MainContent">
            <div className="scrollable">
            <div className="Head"><h1>{this.props.artiste.nom}</h1><img src={`api/artistes/stream/${this.props.artiste._id}`} alt="noImage" key={"artiste"}></img></div>
            <div className="Content">{this.props.artiste.biographie}</div>    
                {albumList}
            </div>
        </div>);
    }
}
export default ArtisteWindow;
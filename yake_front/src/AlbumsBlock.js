import React , { Component } from 'react';
import {Link} from 'react-router-dom';
class AlbumsBlock extends Component{
    render(){
        let albumList=[];
        if(this.props.albums!==undefined && this.props.albums.length>0){
            albumList=this.props.albums.map((ele)=>{
                    return(<Link style={{textDecoration:'none',color:'black'}} to={`/showAlbum?id=${ele._id}`} className="albumRow" key={`${ele.nom}`}>
                    <div className="albumRowContentimg"><img height="100" width="100" src={`api/artistes/albums/stream/${ele._id}`} alt="noImage"/></div>
                    <div className="albumRowContent">{`${ele.nom}`}</div>
                    </Link>);}
                )
                albumList=(<div className="AlbumRows"><div className="AlbumContent">{albumList}</div></div>);
        }
        return (albumList);
    }
}
export default AlbumsBlock;
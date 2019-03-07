import React , { Component } from 'react';
class AlbumsBlock extends Component{
    render(){
        let albumList=[];
        if(this.props.albums.length>0){
            albumList=this.props.albums.map((ele)=>{

                    return(<div className="albumRow" key={`${ele.nom}`} onClick={()=>{this.props.onAlbumClick(ele._id)}}>
                    <div className="albumRowContentimg"><img height="100" width="100" src={`api/artistes/albums/stream/${ele._id}`} alt="noImage"/></div>
                    <div className="albumRowContent">{`${ele.nom}`}</div>
                    </div>);}
                )
                albumList=(<div className="AlbumList"><h3>{"Albums"}</h3><div className="AlbumRows"><div className="AlbumContent">{albumList}</div></div></div>);
        }
        return (albumList);
    }
}
export default AlbumsBlock;
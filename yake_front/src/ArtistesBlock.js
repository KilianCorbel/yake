import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class ArtistesBlock extends Component{
    render(){
        let artisteList = [];
        if(this.props.artistes!==undefined && this.props.artistes.length>0){
            artisteList=this.props.artistes.map(ele=>{
                return(<Link style={{textDecoration:'none',color:'black'}} to={`/showArtiste?id=${ele._id}`} className="artisteRow" key={`${ele.nom}`} onClick={()=>{this.props.onArtisteClick(ele._id)}}>
                        <div className="artisteRowContent"><img height="100" width="100" src={`api/artistes/stream/${ele._id}`} alt="noImage"/></div>
                        <div className="artisteRowContent">{`${ele.nom}`}</div>
                    </Link>);
            });
            artisteList=(<div className="ArtisteRows"><div className={"ArtisteContent"}>{artisteList}</div></div>);
        }
        return (artisteList);
    }
}
export default ArtistesBlock;
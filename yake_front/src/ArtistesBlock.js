import React, { Component } from 'react';
class ArtistesBlock extends Component{
    render(){
        let artisteList = [];
        if(this.props.artistes.length>0){
            artisteList=this.props.artistes.map(ele=>{
                return(<div className="artisteRow" key={`${ele.nom}`} onClick={()=>{this.props.onArtisteClick(ele._id)}}>
                        <div className="artisteRowContent"><img height="100" width="100" src={`api/artistes/stream/${ele._id}`} alt="noImage"/></div>
                        <div className="artisteRowContent">{`${ele.nom}`}</div>
                    </div>);
            });
            artisteList=(<div className="ArtisteList"><h3>{"Liste d'Artistes"}</h3><div className="ArtisteRows"><div className={"ArtisteContent"}>{artisteList}</div></div></div>);
        }
        return (artisteList);
    }
}
export default ArtistesBlock;
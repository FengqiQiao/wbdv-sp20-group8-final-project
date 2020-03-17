import React from "react";
import "./Prototype.css"

class PhotoComponent extends React.Component{
    render(){
        return(
            <div>
                <img className="img" src={this.props.URL} />
            </div>
        )
    }
}

export default PhotoComponent
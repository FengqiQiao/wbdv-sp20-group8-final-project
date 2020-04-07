import React from "react";
import './Prototype.css'
import PhotoComponent from "./photo";

class SearchContainer extends React.Component {
    state = {
        university: [],
        inputField: '',
        show: false
    };

    componentDidMount() {
        if(this.props.university)
            this.search(this.props.university)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.university !== prevProps.university) {
            this.search(this.props.university)
        }
    }

    search = (val) => {
        let isValid = 1;
        fetch(`http://localhost:8080/api/checkvalid/${val}`)
            .then(response => response.json())
            .then(isValid => {
                if (isValid === 1) {
                    let proxy = "https://sleepy-reef-18653.herokuapp.com/";
                    // let proxy = "http://remote.server.com:8085/service";
                    fetch(proxy + `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${val}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyC1ucluPOje2LzYoF5hnN2M9PvnKSYurQg`)
                        .then(response => response.json())
                        .then(results => {
                            console.log(results.candidates);
                            this.setState({
                                university: results.candidates,
                                show: true
                            });
                            if (this.state.university.length !== 0)
                                window.initMap(this.state.university[0].geometry.location.lat, this.state.university[0].geometry.location.lng)
                        })
                } else {
                    alert("Not a valid university name.")
                }
            })
    };

    render(){
        return (
            <div className="container">
                <h1>Final Project</h1>
                <h1>Home Page</h1>
                <li>
                    <a href="/login">login</a>
                </li>
                <li>
                    <a href="/register">register</a>
                </li>
                <input type="text" className="form-control" placeholder="University Name" value={this.state.inputField}
                    onChange={(e) =>
                        this.setState({
                            inputField: e.target.value
                        })
                    }/>
                <div className="search-btn">
                    <button className="form-control btn-primary" onClick={()=>{
                        this.props.history.push(`/search/${this.state.inputField}`)
                        //this.search(this.state.inputField)
                    }}>Search</button>
                </div>

                {
                    // this.state.university.map(data => {
                    //     return data
                    // })
                    <div>
                        {
                            this.state.university.length !== 0 &&
                            this.state.university.map(data =>
                               <div key={(new Date()).getTime()+""}>
                                   <div className="row">
                                       <div className="col-6">
                                           <div className="data-font"><i className="fas fa-university"></i>&nbsp;{data.name}</div>
                                           <div className="data-font"><i className="fas fa-map-marker-alt"></i>&nbsp;&nbsp;{data.formatted_address}</div>
                                           <div className="data-font"><i className="fas fa-star"></i>&nbsp;Rating:&nbsp;{data.rating}</div>
                                       </div>
                                   {/*{*/}
                                   {/*    data.photos &&*/}
                                   {/*    data.photos[0].html_attributions*/}
                                   {/*}*/}
                                   {/*<a href={data.photos.html_attributions}>{}</a>*/}
                                       <div className="col-6">
                                           {
                                               data.photos &&
                                               <PhotoComponent
                                                   URL={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxheight=500&photoreference=${data.photos[0].photo_reference}&key=AIzaSyC1ucluPOje2LzYoF5hnN2M9PvnKSYurQg`}/>
                                           }
                                        </div>
                                   </div>
                               </div>
                             )}

                    </div>
                }

                {
                    this.state.show &&
                    <h3>Google Map</h3>
                }
                <div id="map"></div>
            </div>
        )
    }
}


export default SearchContainer

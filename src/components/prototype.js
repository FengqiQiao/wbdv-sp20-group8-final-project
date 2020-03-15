import React from "react";
import './prototype.css'

class PrototypeContainer extends React.Component {
    state = {
        university: [],
        inputField: '',
        show: false
    }

    // componentDidMount() {
    //     let proxy = "https://cors-anywhere.herokuapp.com/"
    //     fetch(proxy + "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyC1ucluPOje2LzYoF5hnN2M9PvnKSYurQg")
    //         .then(response => response.json())
    //         .then(results => {
    //             console.log(results.candidates)
    //             this.setState({
    //                 university: results.candidates
    //             })
    //         })
    // }

    search = (val) => {
        let proxy = "https://cors-anywhere.herokuapp.com/"
        fetch(proxy + `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${val}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyC1ucluPOje2LzYoF5hnN2M9PvnKSYurQg`)
            .then(response => response.json())
            .then(results => {
                console.log(results.candidates)
                this.setState({
                    university: results.candidates,
                    show: true
                })
                if(this.state.university.length !== 0)
                    window.initMap(this.state.university[0].geometry.location.lat,this.state.university[0].geometry.location.lng)
            })
    }

    render(){
        return (
            <div className="container">
                <h1>Final Project</h1>

                <input type="text" className="form-control" placeholder="University Name" value={this.state.inputField}
                    onChange={(e) =>
                        this.setState({
                            inputField: e.target.value
                        })
                    }/>
                <div className="search-btn">
                    <button className="form-control btn-primary" onClick={()=>{
                        this.search(this.state.inputField)
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
                                   <div>{data.name}</div>
                                   <div>{data.formatted_address}</div>

                                   {
                                       data.photos &&
                                       data.photos[0].html_attributions
                                   }
                                   {/*<a href={data.photos.html_attributions}>{}</a>*/}
                                </div>
                             )}

                    </div>
                }

                {
                    this.state.show &&
                    <h3>My Google Maps Demo</h3>
                }
                <div id="map"></div>
            </div>
        )
    }
}


export default PrototypeContainer
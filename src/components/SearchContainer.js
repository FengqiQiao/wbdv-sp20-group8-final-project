import React from "react";
import './Prototype.css'
import PhotoComponent from "./photo";
import {Link} from "react-router-dom";
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
// import  "bootstrap-table/dist/bootstrap-table.min"
import {logout, profile} from "../services/UserService";

class SearchContainer extends React.Component {
    state = {
        university: [],
        inputField: '',
        inputFieldForum: '',
        // searchStatus: '',
        searchResponse: '',
        loginStatus: 0,
        profile:'',
        show: false,
        clickSearch: false
    };

    componentDidMount() {
        fetch(`http://localhost:8080/profile`, {
            method: 'POST',
            credentials: "include"
        })
            .then(profile =>
                {
                    console.log("profile status:", profile.status);
                    this.setState({
                        profile: profile.json(),
                        loginStatus: profile.status
                    });
                    if(this.props.university) {
                        this.search(this.props.university);
                        this.setState({
                            inputField : this.props.university,
                            inputFieldForum : this.props.university
                        })
                    }
                }
            )

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.university !== prevProps.university) {
            this.search(this.props.university);
            this.setState({
                searchResponse: 0,
            })
        }
        if(this.props.loginStatus !== prevProps.loginStatus) {
            this.search(this.props.university)
        }
    }

    logout = () =>
        logout()
            .then(status => {
                this.props.history.push('/');
                this.setState({
                    loginStatus: 0
                })
            });

    search = (val) => {
        let isValid = 1;
        fetch(` http://localhost:8080/api/checkvalid/${val}`)
            .then(response => response.json())
            .then(isValid => {
                this.setState({
                    searchResponse: isValid
                });
                if (isValid === 1) {
                    let proxy = "https://sleepy-reef-18653.herokuapp.com/";
                    // let proxy = "http://remote.server.com:8085/service";
                    fetch(proxy + `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${val}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyC1ucluPOje2LzYoF5hnN2M9PvnKSYurQg`)
                        .then(response => {
                            // this.setState({
                            //     searchStatus: response.status
                            // });
                            return response.json();
                        })
                        .then((results) => {
                            console.log(results.candidates);
                            console.log("search response:", this.state.searchResponse);
                            this.setState({
                                university: results.candidates,
                                show: true,
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
            <div>
                <nav className="mb-1 navbar navbar-expand-lg navbar-dark info-color">
                    <a className="navbar-brand nav-topic">Study Overseas Forum</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
                            aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                {
                                    this.state.loginStatus !== 200 &&
                                    <Link className="nav-link" to={`/login/${this.state.inputFieldForum}`}>
                                        <i className=" fas fa-sign-in-alt"/> login
                                    </Link>
                                }
                            </li>
                            <li className="nav-item active">
                                {
                                    this.state.loginStatus !== 200 &&
                                    <Link className="nav-link" to={`/register/${this.state.inputFieldForum}`}>
                                        <i className="fas fa-user-plus"/> register
                                    </Link>
                                }
                            </li>
                            {
                                this.state.loginStatus === 200 &&
                                <li className="nav-item active dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4"
                                       data-toggle="dropdown"
                                       aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user"/> logged in </a>
                                    <div className="dropdown-menu dropdown-menu-right dropdown-info"
                                         aria-labelledby="navbarDropdownMenuLink-4">
                                        <Link className="dropdown-item" to="/profile">profile</Link>
                                        <a
                                            className="dropdown-item"
                                            onClick={this.logout}
                                        >
                                            logout
                                        </a>
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
                <div className="container">
                    {/*<h1 className="h1-black">Home Page</h1>*/}
                    {/*<li>*/}
                    {/*    {*/}
                    {/*        this.state.loginStatus !== 200 &&*/}
                    {/*        <Link to="/login">login</Link>*/}
                    {/*    }*/}
                    {/*    {*/}
                    {/*        this.state.loginStatus === 200 &&*/}
                    {/*        <Link onClick={() => alert("already login")}>login</Link>*/}
                    {/*    }*/}
                    {/*    /!*<a href="/login">login</a>*!/*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    {*/}
                    {/*        this.state.loginStatus !== 200 &&*/}
                    {/*        <Link to="/register">register</Link>*/}
                    {/*    }*/}
                    {/*    {*/}
                    {/*        this.state.loginStatus === 200 &&*/}
                    {/*        <Link onClick={() => alert("already login")}>register</Link>*/}
                    {/*    }*/}
                    {/*    /!*<a href="/register">register</a>*!/*/}
                    {/*</li>*/}
                    <img src="https://berkeleyhillel.org/wp-content/uploads/2018/05/conclusion.png.pagespeed.ce_.c6yDVBNGgP.png"/>
                    <hr/>
                    {/*<li>*/}
                    {/*    <a href="/forum">forum</a>*/}
                    {/*</li>*/}
                    <input type="text" className="form-control" placeholder="University Name"
                        onChange={(e) =>
                            this.setState({
                                inputField: e.target.value
                            })
                        }
                           value={this.state.inputField}/>
                    <div className="search-btn">
                        <button className="form-control btn-primary" onClick={()=>{
                            this.setState({
                                clickSearch: true,
                                inputFieldForum: this.state.inputField
                            });
                            this.props.history.push(`/search/${this.state.inputField}`)
                            //this.search(this.state.inputField)
                        }}>Search</button>
                    </div>
                    <hr/>
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
                                               <div className="data-font"><i className="fas fa-university"/>&nbsp;{data.name}</div>
                                               <div className="data-font"><i className="fas fa-map-marker-alt"/>&nbsp;&nbsp;{data.formatted_address}</div>
                                               <div className="data-font"><i className="fas fa-star"/>&nbsp;Rating:&nbsp;{data.rating}</div>
                                               {

                                                       // console.log(this.state.clickSearch)
                                                   // console.log(this.state.serchResponse);

                                                   this.state.searchResponse === 1 &&
                                                   <div className="data-font"><i className="fab fa-forumbee"/>&nbsp;&nbsp;
                                                       {
                                                           this.state.loginStatus === 200 &&
                                                           <Link to={`/forum/${this.state.inputFieldForum}`}>Forum for {this.state.inputFieldForum}</Link>
                                                       }
                                                       {
                                                           this.state.loginStatus === 500 &&
                                                           <Link to={`/login/${this.state.inputFieldForum}`}>Forum for {this.state.inputFieldForum}</Link>
                                                       }
                                                   </div>
                                               }
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
                    <hr/>

                    <div className="favourite-place place-padding">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="section-tittle text-center">
                                        <span>FEATURED OVERSEA STUDY FORUM</span>
                                        <h2>Most Searched Universities</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-place mb-30">
                                        <div className="place-img">
                                            <img src={require("../constants/images/neu.jpg")} alt=""/>
                                        </div>
                                        <div className="place-cap mx-1">
                                            <div className="place-cap-top">
                                                <span><i className="fas fa-star"/><span>4.5</span> </span>
                                                <h3><a href="https://www.northeastern.edu/">Northeastern University</a></h3>
                                                <p className="dolor">$1000 <span>/ Per Semester</span></p>
                                            </div>
                                            <div className="place-cap-bottom">
                                                <ul>
                                                    <li><i className="far fa-clock"/>360 Huntington Ave</li>
                                                    <li><i className="fas fa-map-marker-alt"/>Boston</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-place mb-30">
                                        <div className="place-img">
                                            <img src={require("../constants/images/harvard.jpg")} alt=""/>
                                        </div>
                                        <div className="place-cap mx-1">
                                            <div className="place-cap-top">
                                                <span><i className="fas fa-star"/><span>4.5</span> </span>
                                                <h3><a href="https://www.harvard.edu/">Harvard University</a></h3>
                                                <p className="dolor">$1010 <span>/ Per Semester</span></p>
                                            </div>
                                            <div className="place-cap-bottom">
                                                <ul>
                                                    <li><i className="far fa-clock"/>1585 Massachusetts Avenue</li>
                                                    <li><i className="fas fa-map-marker-alt"/>Cambridge</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-place mb-30">
                                        <div className="place-img">
                                            <img src={require("../constants/images/stanford.jpg")} alt=""/>
                                        </div>
                                        <div className="place-cap mx-1">
                                            <div className="place-cap-top">
                                                <span><i className="fas fa-star"/><span>4.6</span> </span>
                                                <h3><a href="https://www.stanford.edu/">Stanford University</a></h3>
                                                <p className="dolor">$1020 <span>/ Per Semester</span></p>
                                            </div>
                                            <div className="place-cap-bottom">
                                                <ul>
                                                    <li><i className="far fa-clock"/>450 Serra Mall</li>
                                                    <li><i className="fas fa-map-marker-alt"/>Stanford</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-place mb-30">
                                        <div className="place-img">
                                            <img src={require("../constants/images/mit.jpg")} alt=""/>
                                        </div>
                                        <div className="place-cap mx-1">
                                            <div className="place-cap-top">
                                                <span><i className="fas fa-star"/><span>4.7</span> </span>
                                                <h3><a href="http://www.mit.edu/">MIT</a></h3>
                                                <p className="dolor">$1030 <span>/ Per Semester</span></p>
                                            </div>
                                            <div className="place-cap-bottom">
                                                <ul>
                                                    <li><i className="far fa-clock"/>77 Massachusetts Ave</li>
                                                    <li><i className="fas fa-map-marker-alt"/>Cambridge</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-place mb-30">
                                        <div className="place-img">
                                            <img src={require("../constants/images/uiuc.jpg")} alt=""/>
                                        </div>
                                        <div className="place-cap mx-1">
                                            <div className="place-cap-top">
                                                <span><i className="fas fa-star"/><span>4.5</span> </span>
                                                <h3><a href="https://illinois.edu/">UIUC</a></h3>
                                                <p className="dolor">$1040 <span>/ Per Semester</span></p>
                                            </div>
                                            <div className="place-cap-bottom">
                                                <ul>
                                                    <li><i className="far fa-clock"/>506 S. Wright St.</li>
                                                    <li><i className="fas fa-map-marker-alt"/>Champaign</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-6">
                                    <div className="single-place mb-30">
                                        <div className="place-img">
                                            <img src={require("../constants/images/usc.jpg")} alt=""/>
                                        </div>
                                        <div className="place-cap mx-1">
                                            <div className="place-cap-top">
                                                <span><i className="fas fa-star"/><span>4.5</span> </span>
                                                <h3><a href="https://www.usc.edu/">USC</a></h3>
                                                <p className="dolor">$1050 <span>/ Per Semester</span></p>
                                            </div>
                                            <div className="place-cap-bottom">
                                                <ul>
                                                    <li><i className="far fa-clock"/>3551 Trousdale Pkwy</li>
                                                    <li><i className="fas fa-map-marker-alt"/>California</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*<div className="video-area video-bg pt-200 pb-200" data-background={require("../constants/images/neu.jpg")}>*/}
                    {/*    <div className="container">*/}
                    {/*        <div className="row">*/}
                    {/*            <div className="col-xl-12">*/}
                    {/*                <div className="video-caption text-center">*/}
                    {/*                    <div className="video-icon">*/}
                    {/*                        <a className="popup-video" href="https://www.youtube.com/watch?v=1aP-TXUpNoU"*/}
                    {/*                           tabIndex="0"><i className="fas fa-play"></i></a>*/}
                    {/*                    </div>*/}
                    {/*                    <p className="pera1">Love where you're going in the perfect time</p>*/}
                    {/*                    <p className="pera2">Tripo is a World Leading Online</p>*/}
                    {/*                    <p className="pera3"> Tour Booking Platform</p>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }
}


export default SearchContainer

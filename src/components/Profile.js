import React from "react";
import {logout, profile} from "../services/UserService";
import {Link} from "react-router-dom";
import "./Prototype.css";

class ProfileComponent extends React.Component{
    state = {
        profile: {
            email: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
        }
    };

    componentDidMount() {
        profile()
            .then(profile =>
                this.setState({
                profile: profile
            })
                // console.log(profile)
            )
    }

    logout = () =>
        logout()
            .then(status => {
                this.props.history.push('/')
            });

    render(){
        return(

            <div className="page-wrapper bg-blue p-t-100 p-b-100 font-robo">
                <div className="wrapper wrapper--w680">
                    <div className="card card-1">
                        <div className="card-heading"></div>
                        <div className="card-body">
                            <div>
                                <h1>Profile</h1>
                                <div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>Username</h4>
                                        <input className="form-control"
                                               type="text"
                                               readOnly
                                               id="responsive-username"
                                               value="Mike"/>
                                    </div>
                                    <div className="wbdv-field wbdv-password">
                                        <h4>Password</h4>
                                        <input className="form-control"
                                               type="text"
                                               id="responsive-password"
                                               value="1234567"/>
                                    </div>
                                    <div className="wbdv-field wbdv-email">
                                        <h4>Email</h4>
                                        <input id="email"
                                               title="please provide your corporate email"
                                               placeholder="Kevin@gmail.com"
                                               className="form-control" type="email"/>
                                    </div>
                                    <div className="wbdv-field wbdv-role">
                                        <h4>Role</h4>
                                        <select className="form-control">
                                            <option>
                                                Current Student
                                            </option>
                                            <option>
                                                Potential Student
                                            </option>
                                        </select>
                                    </div>
                                    <div className="wbdv-field wbdv-dob">
                                        <h4>Date of Birth</h4>
                                        <input className="form-control" type="date"/>
                                    </div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>First Name</h4>
                                        <input className="form-control"
                                               type="text"
                                               id="responsive-username"
                                               value="Mike"/>
                                    </div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>Last Name</h4>
                                        <input className="form-control"
                                               type="text"
                                               id="responsive-username"
                                               value="Jordan"/>
                                    </div>
                                    <div className="wbdv-field wbdv-role">
                                        <h4>Nationality</h4>
                                        <select className="form-control">
                                            <option>
                                                China
                                            </option>
                                            <option>
                                                India
                                            </option>
                                            <option>
                                                Korea
                                            </option>
                                            <option>
                                                Japan
                                            </option>
                                            <option>
                                                Venezuela
                                            </option>
                                        </select>
                                    </div>
                                    <div className="wbdv-field wbdv-role">
                                        <h4>Gender</h4>
                                        <select className="form-control">
                                            <option>
                                                Male
                                            </option>
                                            <option>
                                                Female
                                            </option>
                                            <option>
                                                Other
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                {/*<ul className="list-group">*/}
                                {/*    <li className="list-group-item">Hi {this.state.profile.username}!</li>*/}
                                {/*    <li className="list-group-item">Email: {this.state.profile.email}!</li>*/}
                                {/*    <li className="list-group-item">Password: {this.state.profile.password}</li>*/}
                                {/*    <li className="list-group-item">FirstName: {this.state.profile.firstName}</li>*/}
                                {/*</ul>*/}
                                {/*<button*/}
                                {/*    onClick={this.logout}*/}
                                {/*    className={`btn btn-danger`}>*/}
                                {/*    Logout*/}
                                {/*</button>*/}
                            </div>
                            <div>
                                <h1>Basic Info</h1>
                                <div className="wbdv-field wbdv-username">
                                    <h4>Education Level</h4>
                                    <input className="form-control"
                                           type="text"
                                           id="responsive-username"
                                           placeholder="0-100"/>
                                </div>
                                <div className="wbdv-field wbdv-username">
                                    <h4>Major</h4>
                                    <input className="form-control"
                                           type="text"
                                           id="responsive-username"
                                           placeholder="Computer Science"/>
                                </div>
                                <div className="wbdv-field wbdv-username">
                                    <h4>GPA</h4>
                                    <input className="form-control"
                                           type="number"
                                           id="responsive-username"
                                           placeholder="4.0"/>
                                </div>
                                <div className="wbdv-field wbdv-username">
                                    <h4>TOEFL Score</h4>
                                    <input className="form-control"
                                           type="number"
                                           id="responsive-username"
                                           placeholder="108"/>
                                </div>
                                <div className="wbdv-field wbdv-username">
                                    <h4>GRE Score</h4>
                                    <input className="form-control"
                                           type="number"
                                           id="responsive-username"
                                           placeholder="327"/>
                                </div>
                                <div className="wbdv-field wbdv-username">
                                    <h4>Research Experience</h4>
                                    <input className="form-control"
                                           type="text"
                                           id="responsive-username"
                                           placeholder="Working in a deep learning lab."/>
                                </div>
                                <div className="wbdv-field wbdv-username">
                                    <h4>Working Experience</h4>
                                    <input className="form-control"
                                           type="text"
                                           id="responsive-username"
                                           placeholder="Working in Google."/>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )}
}

export default ProfileComponent

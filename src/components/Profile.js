import React from "react";
import {logout, profile, update} from "../services/UserService";
import {Link} from "react-router-dom";
import "./Prototype.css";

class ProfileComponent extends React.Component{
    state = {
        profile: {
            id: "",
            email: '',
            username: '',
            password: '',
            role:'',
            firstName: '',
            lastName: '',
            gender: '',
            birthday: '',
            nationality: '',
            currentSchool: '',
            educationLevel: '',
            major: '',
            gpa: 4.0,
            toefl: 120,
            gre: 340,
            researchExperience: '',
            workingExperience: '',
            questions: [],
            answers: []
        },
        loginStatus: 0
    };

    componentDidMount = () => {
        fetch(`http://localhost:8080/profile`, {
            method: 'POST',
            credentials: "include"
        })
            .then(async currentProfile =>
                {
                    console.log("login status from profile page:", currentProfile.status,currentProfile);
                    await this.loginSetState(currentProfile);
                    if (this.state.loginStatus === 200)
                        profile()
                            .then(profile => {
                                    this.setState({
                                        profile: profile
                                    });
                                console.log(profile)
                            }
                            );
                }

            )
    };

    loginSetState = (profile) =>
        this.setState({
            loginStatus: profile.status
        });

    logout = () =>
        logout()
            .then(status => {
                this.props.history.push('/')
            });

    updateProfile = (user) =>
        // alert("触发")
        update(user)
            .then(status => {
                if (status !== 0){
                    alert("successfully updated");
                }
                else
                    alert("server error")
                // alert(status)
                profile()
                    .then(res => {
                        console.log(res)
                        this.setState({
                        profile: res
                    })}
                    )
            });


    render(){
        if (this.state.loginStatus === 200) {
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
                                            <input
                                                className="form-control"
                                                type="text"
                                                readOnly
                                                id="responsive-username"
                                                value={this.state.profile.username}
                                            />
                                        </div>
                                        <div className="wbdv-field wbdv-password">
                                            <h4>Password</h4>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="responsive-password"
                                                value={this.state.profile.password}
                                                 onChange={(e) => {
                                                    this.setState({
                                                        profile: {
                                                            ...this.state.profile,
                                                            password: e.target.value
                                                        }
                                                    })
                                                 }}
                                            />
                                        </div>
                                        <div className="wbdv-field wbdv-email">
                                            <h4>Email</h4>
                                            <input
                                                id="email"
                                                title="please provide your corporate email"
                                                placeholder="Kevin@gmail.com"
                                                value={this.state.profile.email}
                                                onChange={(e) => {
                                                   this.setState({
                                                       profile: {
                                                           ...this.state.profile,
                                                           email: e.target.value
                                                       }
                                                   })
                                                }}
                                               className="form-control"
                                               type="email"
                                            />
                                        </div>
                                        <div className="wbdv-field wbdv-role">
                                            <h4>Role</h4>
                                            <select
                                                className="form-control"
                                                value={this.state.profile.role}
                                                onChange={(e) => {
                                                    this.setState({
                                                        profile: {
                                                            ...this.state.profile,
                                                            role: e.target.value
                                                        }
                                                    })
                                                }}
                                            >
                                                <option value="CURRENT">Current Student</option>
                                                <option value="POTENTIAL">Potential Student</option>
                                            </select>
                                        </div>
                                        <div className="wbdv-field wbdv-dob">
                                            <h4>Date of Birth</h4>
                                            <input
                                                className="form-control"
                                                type="date"
                                                value={this.state.profile.birthday}
                                                onChange={(e) => {
                                                    this.setState({
                                                        profile: {
                                                            ...this.state.profile,
                                                            birthday: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="wbdv-field wbdv-username">
                                            <h4>First Name</h4>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="responsive-username"
                                                value={this.state.profile.firstName}
                                                onChange={(e) => {
                                                    this.setState({
                                                        profile: {
                                                            ...this.state.profile,
                                                            firstName: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="wbdv-field wbdv-username">
                                            <h4>Last Name</h4>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="responsive-username"
                                                value={this.state.profile.lastName}
                                                onChange={(e) => {
                                                    this.setState({
                                                        profile: {
                                                            ...this.state.profile,
                                                            lastName: e.target.value
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <div className="wbdv-field wbdv-role">
                                            <h4>Nationality</h4>
                                            <select
                                                className="form-control"
                                                value={this.state.profile.nationality}
                                                onChange={(e) => {
                                                    this.setState({
                                                        profile: {
                                                            ...this.state.profile,
                                                            nationality: e.target.value
                                                        }
                                                    })
                                                }}
                                            >
                                                <option>Please select your nationality</option>
                                                <option value="CHINA">China</option>
                                                <option value="INDIA">India</option>
                                                <option value="KOREA">Korea</option>
                                                <option value="JAPAN">Japan</option>
                                                <option value="VENEZUELA">Venezuela</option>
                                            </select>
                                        </div>
                                        <div className="wbdv-field wbdv-role">
                                            <h4>Gender</h4>
                                            <select
                                                className="form-control"
                                                value={this.state.profile.gender}
                                                onChange={(e) => {
                                                    this.setState({
                                                        profile: {
                                                            ...this.state.profile,
                                                            gender: e.target.value
                                                        }
                                                    })
                                                }}
                                            >
                                                <option>Please select your gender</option>
                                                <option value="MALE">Male</option>
                                                <option value="FEMALE">Female</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>
                                    </div>
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
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="responsive-username"
                                            placeholder="undergraduate"
                                            value={this.state.profile.educationLevel}
                                            onChange={(e) => {
                                                this.setState({
                                                    profile: {
                                                        ...this.state.profile,
                                                        educationLevel: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>Current School</h4>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="responsive-username"
                                            placeholder="HIT"
                                            value={this.state.profile.currentSchool}
                                            onChange={(e) => {
                                                this.setState({
                                                    profile: {
                                                        ...this.state.profile,
                                                        currentSchool: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>Major</h4>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="responsive-username"
                                            placeholder="Computer Science"
                                            value={this.state.profile.major}
                                            onChange={(e) => {
                                                this.setState({
                                                    profile: {
                                                        ...this.state.profile,
                                                        major: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>GPA</h4>
                                        <input
                                            className="form-control"
                                            type="number"
                                            id="responsive-username"
                                            placeholder="4.0"
                                            value={this.state.profile.gpa}
                                            onChange={(e) => {
                                                this.setState({
                                                    profile: {
                                                        ...this.state.profile,
                                                        gpa: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>TOEFL Score</h4>
                                        <input
                                            className="form-control"
                                            type="number"
                                            id="responsive-username"
                                            placeholder="120"
                                            value={this.state.profile.toefl}
                                            onChange={(e) => {
                                                this.setState({
                                                    profile: {
                                                        ...this.state.profile,
                                                        toefl: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>GRE Score</h4>
                                        <input
                                            className="form-control"
                                            type="number"
                                            id="responsive-username"
                                            placeholder="340"
                                            value={this.state.profile.gre}
                                            onChange={(e) => {
                                                this.setState({
                                                    profile: {
                                                        ...this.state.profile,
                                                        gre: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>Research Experience</h4>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="responsive-username"
                                            placeholder="Working in a deep learning lab."
                                            value={this.state.profile.researchExperience}
                                            onChange={(e) => {
                                                this.setState({
                                                    profile: {
                                                        ...this.state.profile,
                                                        researchExperience: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                    <div className="wbdv-field wbdv-username">
                                        <h4>Working Experience</h4>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="responsive-username"
                                            placeholder="Working in Google."
                                            value={this.state.profile.workingExperience}
                                            onChange={(e) => {
                                                this.setState({
                                                    profile: {
                                                        ...this.state.profile,
                                                        workingExperience: e.target.value
                                                    }
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        this.updateProfile(this.state.profile)
                                            .then(res => console.log(res))
                                    }}
                                    className="form-control btn btn-success"
                                >
                                    update
                                </button>
                                <Link to="/">
                                    <button className="form-control btn home-page-button">
                                        Back
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
        )}
        else{
            return(
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>Oops!</h1>
                            <h2>Not logged in, can't see profile</h2>
                        </div>
                        <Link to="/login">Go TO Login</Link>
                    </div>
                </div>
            )
        }
}}

export default ProfileComponent

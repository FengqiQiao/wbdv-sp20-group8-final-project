import React from "react";
import {logout, profile} from "../services/UserService";
import {Link} from "react-router-dom";

class ProfileComponent extends React.Component{
    state = {
        profile: {
            email: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        loginStatus: 0
    };

    componentDidMount = () => {
        fetch(`https://group8-final-project-java.herokuapp.com/profile`, {
            method: 'POST',
            credentials: "include"
        })
            .then(async currentProfile =>
                {
                    console.log("login status from profile page:", currentProfile.status);
                    await this.loginSetState(currentProfile);
                    if (this.state.loginStatus === 200)
                        profile()
                            .then(profile =>
                                    this.setState({
                                        profile: profile
                                    })
                                // console.log(profile)
                            );
                    // else
                    // {
                    //     this.props.history.push('/');
                    //     // alert("You are not logged in, can not view profile, please login first!")
                    // }
                }

            )

    };

    loginSetState = (profile) =>
        this.setState({
            // profile: profile.json(),
            loginStatus: profile.status
        });

    logout = () =>
        logout()
            .then(status => {
                this.props.history.push('/')
            });

    render() {
        if (this.state.loginStatus === 200) {
            return (
                <div>
                    <h1>profile</h1>
                    <ul className="list-group">
                        <li className="list-group-item">Hi {this.state.profile.username}!</li>
                        <li className="list-group-item">Email: {this.state.profile.email}!</li>
                        <li className="list-group-item">Password: {this.state.profile.password}</li>
                        <li className="list-group-item">FirstName: {this.state.profile.firstName}</li>
                    </ul>
                    <button
                        onClick={this.logout}
                        className={`btn btn-danger`}>
                        Logout
                    </button>
                </div>
            )
        }
        else{
            return (
                <div id="notfound">
                    <div className="notfound">
                        <div className="notfound-404">
                            <h1>Oops!</h1>
                            <h2>You are not logged in, can't view your profile </h2>
                        </div>
                        <Link to="/login">Go TO Login Page</Link>
                    </div>
                </div>
            )
        }

    }

}

export default ProfileComponent

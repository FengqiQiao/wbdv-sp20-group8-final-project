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
        )}
}

export default ProfileComponent

import React from "react";
import {logout, profile} from "../services/UserService";

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
                <span>Hi {this.state.profile.username}!</span>
                <button
                    onClick={this.logout}
                    className={`btn btn-danger`}>
                    Logout
                </button>
            </div>
        )}
}

export default ProfileComponent

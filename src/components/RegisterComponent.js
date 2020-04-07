import React from "react";
import "./Prototype.css"
import {register} from "../services/UserService";
import $ from "jquery"

class RegisterComponent extends React.Component{
    state = {
        username: '',
        email: '',
        password: '',
        validatePassword: '',
        role: ''
    };

    // dropdown = () =>
    //     $('.dropdown-toggle').dropdown();
    //
    // registerTest = () =>
    //     this.props.history.push('/search');

    registerService = (user) =>
       register(user)
           .then(newUser => this.props.history.push('/profile'));

    render(){
        return(
            <div className="signup">
                <div className="container signin-container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Register</h2>
                            <div
                                className="register-form"
                                id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"/>
                                    </label>
                                    <input
                                        value={this.state.username}
                                        onChange={(e) => this.setState({
                                            username: e.target.value
                                        })}
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"/>
                                    </label>
                                    <input
                                        value={this.state.email}
                                        onChange={(e) => this.setState({
                                            email: e.target.value
                                        })}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass">
                                        <i className="zmdi zmdi-lock"/>
                                    </label>
                                    <input
                                        value={this.state.password}
                                        onChange={(e) => this.setState({
                                            password: e.target.value
                                        })}
                                        type="password"
                                        name="pass"
                                        id="pass"
                                        placeholder="Password"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re-pass">
                                        <i className="zmdi zmdi-lock-outline"/>
                                    </label>
                                    <input
                                        value={this.state.validatePassword}
                                        onChange={(e) => this.setState({
                                            validatePassword: e.target.value
                                        })}
                                        type="password"
                                        name="re_pass"
                                        id="re_pass"
                                        placeholder="Repeat your password"/>
                                </div>
                                {/*<div className="form-group">*/}
                                <div className="form-group role-border">
                                    <i className="zmdi zmdi-account-box "/>
                                    <select
                                        className="custom-select w-75 ml-2"
                                        onChange={(e) => {
                                            this.setState({
                                              role: e.target.value
                                            })
                                        }}
                                        value={this.state.role}
                                    >
                                        <option value="CURRENT">Current Student</option>
                                        <option value="POTENTIAL">Potential Student</option>
                                    </select>
                                </div>
                                {/*</div>*/}
                                <div className="form-group form-button">
                                    <input
                                        onClick={() => this.registerService(this.state)}
                                        type="button"
                                        name="signin"
                                        id="signin"
                                        className="form-submit"
                                        value="Register"/>
                                </div>
                            </div>
                        </div>
                        <div className="signup-image">
                            <figure><img src={require('../constants/images/signup-image.jpg')} alt="sing up image"/></figure>
                            <a href="/login" className="signup-image-link"><h6><u><b><i>I am already member</i></b></u></h6></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterComponent

import React from "react";
import "./Prototype.css"
import {register} from "../services/UserService";
import {API_URL} from "../constants/costants";

class RegisterComponent extends React.Component{
    state = {
        newUser: {
            username: '',
            email: '',
            password: '',
            validatePassword: '',
            role: '',
            registerStatus: ''
        },
        usernameCheck: '',
        emailValidCheck: true,
        passwordMatchCheck: true,
        roleCheck: true
    };

    registerPre = () => {
        if (this.state.newUser.password !== this.state.newUser.validatePassword){
            this.setState({
                passwordMatchCheck: false
            });
        }
        else
            this.setState({
                passwordMatchCheck: true
            });

        if (!this.validateEmail(this.state.newUser.email))
            this.setState({
                emailValidCheck: false
            });
        else
            this.setState({
                emailValidCheck: true
            });
        if (this.state.newUser.role === '')
            this.setState({
                roleCheck: false
            });
        else
            this.setState({
                roleCheck: true
            })
    };

    registerPost = async () => {
         await this.registerPre();
         if (this.state.emailValidCheck && this.state.passwordMatchCheck && this.state.roleCheck){
             this.registerService(this.state.newUser);
            // alert(this.state.emailValidCheck);
            // alert(this.state.passwordMatchCheck);
        }

    };

    registerService = (user) => {
        this.usernameRegisterCheck(user.username)
            .then(result => {this.setState({
                usernameCheck: result
            })})
            .then(result => {
                if (this.state.usernameCheck === 0)
                    alert("this username is already taken");
                else
                    register(user)
                        .then(newUser => {
                            if (this.props.dest === undefined)
                                this.props.history.push("/");
                            else
                                this.props.history.push(`/search/${this.props.dest}`);
                        })
            });
        // register(user)
        //     .then(newUser => this.props.history.push('/forum'));
    }

    usernameRegisterCheck = (username) =>
        fetch(`${API_URL}/api/usernameCheck/${username}`,{
            method: "GET",
            credentials: "include"
        }).then(result => result.json());

    validateEmail = (email) => {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (this.props.click !== prevProps.click){
    //         this.render()
    //     }
    // }

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
                                        value={this.state.newUser.username}
                                        onChange={(e) => this.setState({
                                            newUser: {
                                                ...this.state.newUser,
                                                username: e.target.value
                                        }})}
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Your Name"/>
                                    {/*<div className="alert alert-secondary" role="alert">*/}
                                    {/*    This is a secondary alert—check it out!*/}
                                    {/*</div>*/}
                                </div>

                                <div className={`form-group ${!this.state.emailValidCheck?'warning':''}`}>
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email"/>
                                    </label>
                                    <input
                                        value={this.state.newUser.email}
                                        onChange={(e) => this.setState({
                                            newUser: {
                                                ...this.state.newUser,
                                                email: e.target.value
                                        }})}
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Your Email"/>
                                </div>
                                <div className={`form-group ${!this.state.passwordMatchCheck?'warning':''}`}>
                                    <label htmlFor="pass">
                                        <i className="zmdi zmdi-lock"/>
                                    </label>
                                    <input
                                        value={this.state.newUser.password}
                                        onChange={(e) => this.setState({
                                            newUser: {
                                                ...this.state.newUser,
                                                password: e.target.value
                                        }})}
                                        type="password"
                                        name="pass"
                                        id="pass"
                                        placeholder="Password"/>
                                </div>
                                <div className={`form-group ${!this.state.passwordMatchCheck?'warning':''}`}>
                                    <label htmlFor="re-pass">
                                        <i className="zmdi zmdi-lock-outline"/>
                                    </label>
                                    <input
                                        value={this.state.newUser.validatePassword}
                                        onChange={(e) => {
                                            this.setState({
                                                newUser: {
                                                    ...this.state.newUser,
                                                    validatePassword: e.target.value
                                            }})
                                        }}
                                        type="password"
                                        name="re_pass"
                                        id="re_pass"
                                        placeholder="Repeat your password"/>
                                </div>
                                {/*<div className="form-group">*/}
                                <div className={`form-group role-border ${!this.state.roleCheck?'warning':''}`}>
                                    <i className="zmdi zmdi-account-box "/>
                                    <select
                                        className="custom-select w-75 ml-2"
                                        onChange={(e) => {
                                            this.setState({
                                                newUser: {
                                                    ...this.state.newUser,
                                                    role: e.target.value
                                            }})
                                        }}
                                        value={this.state.newUser.role}
                                    >
                                        <option>Please selete your role</option>
                                        <option value="CURRENT">Current Student</option>
                                        <option value="POTENTIAL">Potential Student</option>
                                    </select>
                                </div>
                                {/*</div>*/}
                                <div className="form-group form-button">
                                    <input
                                        onClick={this.registerPost}
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

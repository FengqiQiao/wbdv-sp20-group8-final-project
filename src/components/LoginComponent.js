import React from "react";
import "./Prototype.css"
import {login} from "../services/UserService";
import {Link} from "react-router-dom";

class LoginComponent extends React.Component{
    state = {
        user: {
            username: '',
            password: ''
        }
    };


    loginService = async (user, dest) =>{
        let res = await login(user)
         // await console.log("role:",res.json().role)
        if (res.status === 200) {
            let resJson = await res.json()
            if (resJson.role === "ADMIN")
                this.props.history.push("/admin");
            else if (dest !== undefined)
                this.props.history.push(`/search/${dest}`);
            else
                this.props.history.push("/");
        }
        else
            alert("login failure");
}
// error message: status code: 500 {"timestamp":"2020-04-18T00:22:47.159+0000","status":500,"error":"Internal Server Error","message":"No message available","path":"/login"}
// successful login: status code: 200

    render(){
        return(
            <div className="sign-in">
                <div className="container signin-container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src={require("../constants/images/signin-image.jpg")} alt="sing up image"/></figure>
                            <Link to={`/register/${this.props.dest}`} className="signup-image-link"><h6><u><b><i>Create an account</i></b></u></h6></Link>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Login</h2>
                            <div
                                // method="POST"
                                className="register-form"
                                id="login-form">
                                <div className="form-group">
                                    <label htmlFor="your_name">
                                        <i className="zmdi zmdi-account material-icons-name"/>
                                    </label>
                                    {/*username*/}
                                    <input
                                        value={this.state.user.username}
                                        onChange={
                                            (e) => {
                                                const username = e.target.value;
                                                this.setState(prevState =>({
                                                user: {
                                                    ...prevState.user,
                                                    username: username
                                                }
                                            }))}
                                        }
                                        type="text"
                                        name="your_name"
                                        id="your_name"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass">
                                        <i className="zmdi zmdi-lock"/>
                                    </label>
                                    {/*password*/}
                                    <input
                                        value={this.state.user.password}
                                        onChange={
                                            (e) => {
                                                const password = e.target.value;
                                                this.setState(prevState =>({
                                                    user: {
                                                        ...prevState.user,
                                                        password: password
                                                    }
                                                }))
                                            }
                                        }
                                        type="password"
                                        name="your_pass"
                                        id="your_pass"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term"/>
                                    <label htmlFor="remember-me" className="label-agree-term">
                                        <span><span></span></span>
                                        Remember me
                                    </label>
                                </div>
                                <div className="form-group form-button">
                                    <input
                                        onClick={() => this.loginService(this.state.user, this.props.dest)}
                                        type="button"
                                        name="signin"
                                        id="signin"
                                        className="form-submit"
                                        value="Log in"/>
                                </div>
                            </div>
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li>
                                        <a href="#">
                                            <i className="display-flex-center zmdi zmdi-facebook"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="display-flex-center zmdi zmdi-twitter"/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="display-flex-center zmdi zmdi-google"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent

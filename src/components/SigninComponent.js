import React from "react";
import "./Prototype.css"

class SigninComponent extends React.Component{
    render(){
        return(
            <div className="sign-in">
                <div className="container signin-container">
                    <div className="signin-content">
                        <div className="signin-image">
                            <figure><img src={require("../constants/images/signin-image.jpg")} alt="sing up image"/></figure>
                            <a href="/signup" className="signup-image-link"><h6><u><b><i>Create an account</i></b></u></h6></a>
                        </div>

                        <div className="signin-form">
                            <h2 className="form-title">Sign in</h2>
                            <form method="POST" className="register-form" id="login-form">
                                <div className="form-group">
                                    <label htmlFor="your_name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="your_name" id="your_name" placeholder="Your Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="your_pass" id="your_pass" placeholder="Password"/>
                                </div>
                                {/*<div className="form-group">*/}
                                {/*    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term"/>*/}
                                {/*    <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember*/}
                                {/*        me</label>*/}
                                {/*</div>*/}
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit"
                                           value="Log in"/>
                                </div>
                            </form>
                            <div className="social-login">
                                <span className="social-label">Or login with</span>
                                <ul className="socials">
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                    <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SigninComponent

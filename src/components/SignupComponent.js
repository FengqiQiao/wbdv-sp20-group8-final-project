import React from "react";
import "./Prototype.css"

class SignupComponent extends React.Component{
    render(){
        return(
            <div className="signup">
                <div className="container signin-container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="name"><i
                                        className="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="name" id="name" placeholder="Your Name"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                                    <input type="email" name="email" id="email" placeholder="Your Email"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="pass" id="pass" placeholder="Password"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="re-pass"><i className="zmdi zmdi-lock-outline"></i></label>
                                    <input type="password" name="re_pass" id="re_pass"
                                           placeholder="Repeat your password"/>
                                </div>
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit"
                                           value="Register"/>
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={require('../constants/images/signup-image.jpg')} alt="sing up image"/></figure>
                            <a href="/" className="signup-image-link"><h6><u><b><i>I am already member</i></b></u></h6></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupComponent

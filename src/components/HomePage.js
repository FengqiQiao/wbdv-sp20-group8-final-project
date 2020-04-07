import React from "react";

class HomePageComponent extends React.Component{
    render(){
        return(
            <div>
                <h1>Home Page</h1>
                <li>
                    <a href="/login">login</a>
                </li>
                <li>
                    <a href="/register">register</a>
                </li>
            </div>
        )
    }
}

export default HomePageComponent

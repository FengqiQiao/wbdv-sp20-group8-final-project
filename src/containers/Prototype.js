import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import SearchContainer from "../components/SearchContainer";
import SignupComponent from "../components/SignupComponent";
import SigninComponent from "../components/SigninComponent";

class Prototype extends React.Component {


    render(){
        return(
            <div>
                <Router>
                    <Route
                        path={"/"}
                        exact={true}
                        render={(props) =>
                            <SigninComponent
                                {...props}/>}
                    />

                    <Route
                        path={"/signup"}
                        exact={true}
                        render={(props) =>
                            <SignupComponent
                                {...props}/>}
                    />

                    <Route
                        path={"/search"}
                        exact={true}
                        render={(props) =>
                            <SearchContainer
                                {...props}/>}
                    />


                    <Route
                        path={"/search/:university"}
                        exact={true}
                        render={(props) =>
                            <SearchContainer
                                university={props.match.params.university}
                                {...props}/>}
                    />
                </Router>
            </div>
        )
    }
}


export default Prototype

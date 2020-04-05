import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import PrototypeContainer from "../components/PrototypeContainer";
import LoginComponent from "../components/LoginComponent";

class Prototype extends React.Component {


    render(){
        return(
            <div>
                <Router>
                    <Route
                        path={"/"}
                        exact={true}
                        render={(props) =>
                            <LoginComponent
                                {...props}/>}
                    />

                    <Route
                        path={"/search"}
                        exact={true}
                        render={(props) =>
                            <PrototypeContainer
                                {...props}/>}
                    />


                    <Route
                        path={"/search/:university"}
                        exact={true}
                        render={(props) =>
                            <PrototypeContainer
                                university={props.match.params.university}
                                {...props}/>}
                    />
                </Router>
            </div>
        )
    }
}


export default Prototype

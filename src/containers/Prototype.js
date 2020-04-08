import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import SearchContainer from "../components/SearchContainer";
import RegisterComponent from "../components/RegisterComponent";
import LoginComponent from "../components/LoginComponent";
import ProfileComponent from "../components/Profile";
import ForumComponent from "../components/ForumComponent";

class Prototype extends React.Component {


    render(){
        return(
            <div>
                <Router>
                    <Route
                        path={"/"}
                        exact={true}
                        render={(props) =>
                            <SearchContainer
                                {...props}/>}
                    />

                    <Route
                        path={"/login"}
                        exact={true}
                        render={(props) =>
                            <LoginComponent
                                {...props}/>}
                    />

                    <Route
                        path={"/register"}
                        exact={true}
                        render={(props) =>
                            <RegisterComponent
                                {...props}/>}
                    />

                    {/*<Route*/}
                    {/*    path={"/search"}*/}
                    {/*    exact={true}*/}
                    {/*    render={(props) =>*/}
                    {/*        <SearchContainer*/}
                    {/*            {...props}/>}*/}
                    {/*/>*/}

                    <Route
                        path={"/profile"}
                        exact={true}
                        render={(props) =>
                            <ProfileComponent
                                {...props}/>}
                    />

                    <Route
                        path={"/forum"}
                        exact={true}
                        render={(props) =>
                            <ForumComponent
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

import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom"
import SearchContainer from "../components/SearchContainer";
import RegisterComponent from "../components/RegisterComponent";
import LoginComponent from "../components/LoginComponent";
import ProfileComponent from "../components/Profile";
import ForumComponent from "../components/ForumComponent";
import AdminComponent from "../components/AdminComponent";
import AdminAnswersComponent from "../components/AdminAnswersComponent";

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
                        path={"/login/:dest"}
                        exact={true}
                        render={(props) =>
                            <LoginComponent
                                dest={props.match.params.dest}
                                {...props}/>}
                    />

                    <Route
                        path={"/register"}
                        exact={true}
                        render={(props) =>
                            <RegisterComponent
                                {...props}/>}
                    />

                    <Route
                        path={"/register/:dest"}
                        exact={true}
                        render={(props) =>
                            <RegisterComponent
                                dest={props.match.params.dest}
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
                        path={"/admin"}
                        exact={true}
                        render={(props) =>
                            <AdminComponent
                                {...props}/>}
                    />

                    <Route
                        path={"/admin/questions/:qid/answers"}
                        exact={true}
                        render={(props) =>
                            <AdminAnswersComponent
                                qid={props.match.params.qid}
                                {...props}/>}
                    />

                    <Route
                        path={"/forum/:universityName"}
                        exact={true}
                        render={(props) =>
                            <ForumComponent
                                universityName={props.match.params.universityName}
                                {...props}/>}
                    />

                    <Route
                        path={"/forum/:universityName/questions/:qid/answers"}
                        exact={true}
                        render={(props) =>
                            <ForumComponent
                                universityName={props.match.params.universityName}
                                qid={props.match.params.qid}
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

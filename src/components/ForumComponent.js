import React from "react";
import {profile} from "../services/UserService";
import {Link} from "react-router-dom";
import {findUniversityByName} from "../services/UniversityService";
import NewQuestionComponent from "./NewQuestionComponent";
import {findQuestionById, findQuestionsForUniversity} from "../services/QuestionService";
import {createAnswer, findAnswersForQuestion} from "../services/AnswerService";

// test
class ForumComponent extends React.Component {
    state = {
        university: {
            imgURL: ''
        },
        profile: {
            role: '',
            major: '',
            gpa: 4.0,
            educationLevel: '',
            currentSchool: ''
        },
        newAnswer: {
            time: '',
            answerContent: '',
            questionId: ''
        },
        askingQuestion: false,
        multipleAnswer: false,
        question: '',
        questions: [],
        answers: []
    };

    componentDidMount() {
        profile()
            .then( profile  => this.setState({
                profile: profile
        }));

        findUniversityByName(this.props.universityName)
            .then(res =>{
                this.setState({
                    university: res
                })
            });

        findQuestionsForUniversity(this.props.universityName)
            .then(res => {
                this.setState({
                    questions: res
                })}
            );
        if(this.props.qid !== undefined) {
            findAnswersForQuestion(this.props.qid)
                .then(res => {
                    this.setState({
                        answers: res
                    })
                })

            this.findQuestionId(this.props.qid)
            // .then(res => {
            //     this.setState({
            //         multipleAnswer: true
            //     })
            // });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.askingQuestion !== this.state.askingQuestion){
            findQuestionsForUniversity(this.props.universityName)
                .then(res => {
                    this.setState({
                        questions: res
                    })
                    console.log(res)
                })
        }
    }

    postQuestion = () => {
        this.setState(prevState => ({
            askingQuestion: !prevState.askingQuestion
        }))
    }

    findQuestionId = (qid) =>
        findQuestionById(qid)
            .then(res => {
                this.setState({
                    question: res,
                    multipleAnswer: true
                })
            });

    postAnswer = async () => {
        if(this.state.newAnswer.answerContent !== '') {
            let currentDate = new Date()
            await this.setState({
                newAnswer: {
                    ...this.state.newAnswer,
                    questionId: this.props.qid,
                    time: currentDate.toLocaleString('en')
                }
            });
            await createAnswer(this.props.qid, this.state.newAnswer);
            await findAnswersForQuestion(this.props.qid)
                .then(res => {
                    this.setState({
                        answers: res
                    })
                })
            this.setState({
                newAnswer: {
                    ...this.state.newAnswer,
                    answerContent: ''
                }
            })
        }
        else
            alert("answer content can not be empty")
    }
    render() {
        return(
            <div className="container-fluid">
                <div className="tp-banner-container">
                    <div className="tp-banner" >
                        <img src={this.state.university.imgURL}  className="headerImage"/>
                        {/*<img src='https://catalystactivation.com/imager/primaryimages/54390/Projects-MW-NEU-Primary_6270d9b7953ab4c08cff3b32ec11b910.jpg' height="400" className="headerImage"/>*/}
                    </div>
                </div>

                <div className="headernav">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2 d-none d-sm-block selecttopic">
                                {this.props.universityName}
                            </div>
                            <div className="col-sm-5 d-none d-sm-block search ">
                                <span className="pull-left txt">
                                    <input type="text"
                                           className="form-control w-75"
                                           placeholder="Search Post"
                                    />
                                </span>
                            </div>
                            <div className="col-sm-1 d-none d-sm-block search">
                                <span className="float-right">
                                    <button className="btn btn-default" type="button">
                                        <i className="fa fa-search"/>
                                    </button>
                                </span>
                            </div>
                            <div className="col-sm-4 avt">
                                <div className="align-self-center">
                                    {
                                        !this.state.multipleAnswer &&
                                        <button className="btn btn-primary" onClick={() => {
                                            this.setState(prevState => ({
                                                askingQuestion: !prevState.askingQuestion
                                            }))
                                        }}>
                                            Start New Post
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    {
                        !this.state.askingQuestion &&  !this.state.multipleAnswer &&
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-xs-12 col-md-8 form-inline">
                                    <div className="pull-left">
                                        <Link to={`/search/${this.props.universityName}`} className="prevnext">
                                            <i className="fa fa-angle-left"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {
                        !this.state.askingQuestion &&  this.state.multipleAnswer &&
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8 col-xs-12 col-md-8 form-inline">
                                    <div className="pull-left">
                                        <div className="prevnext">
                                            <Link to={`/forum/${this.props.universityName}`} className="prevnext">
                                                <i
                                                    className="fa fa-angle-left"
                                                    onClick={() => this.setState({
                                                        multipleAnswer: false
                                                    })}
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                {
                                    this.state.askingQuestion && !this.state.multipleAnswer  &&
                                    <NewQuestionComponent
                                        universityName={this.props.universityName}
                                        postQuestion={this.postQuestion}
                                    />
                                }

                                {/*questions*/}
                                <div>
                                {
                                    !this.state.askingQuestion &&  !this.state.multipleAnswer && this.state.questions
                                        && this.state.questions.map(question =>
                                        <div className="post form-inline" key={question.id}>
                                            <div className="wrap-ut pull-left">
                                                <div className="mx-5 my-5">
                                                    <h2>
                                                        <Link
                                                            to={`/forum/${this.props.universityName}/questions/${question.id}/answers`}
                                                            // onClick={() => {this.setState({
                                                            //     multipleAnswer: true,
                                                            // });
                                                            // // this.findQuestionId(question.id)
                                                            // }}
                                                        >
                                                            {question.questionTitle}
                                                        </Link>
                                                    </h2>
                                                    <hr/>
                                                    <p>{question.questionContent}
                                                    </p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="postinfo pull-left">
                                                <div className="comments">
                                                    <div className="commentbg">
                                                        560
                                                        <div className="mark"></div>
                                                    </div>

                                                </div>
                                                <div className="views"><i className="fa fa-eye"/> 1,568</div>
                                                <div className="time"><i className="fa fa-clock"/>&nbsp;{question.time}</div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    )
                                }

                                {/*answers -> question title/ question content*/}
                                {
                                    !this.state.askingQuestion &&  this.state.multipleAnswer &&
                                    // <div className="post form-inline">
                                    //     <div className="wrap-ut pull-left">
                                    //         <div className="mx-5 my-5">
                                    //             <p>{this.state.question.questionTitle}
                                    //                 <Link to={`/forum/${this.props.universityName}`}>
                                    //                     <i
                                    //                         className="fa fa-times float-right"
                                    //                         onClick={() => this.setState({
                                    //                             multipleAnswer: false
                                    //                         })}
                                    //                     />
                                    //                 </Link>
                                    //             </p>
                                    //             <p>{this.state.question.questionContent}</p>
                                    //         </div>
                                    //         <div className="clearfix"></div>
                                    //     </div>
                                    // </div>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                                <span>
                                                    <span className="answer-font">
                                                        <i className="fas fa-question-circle"/>
                                                        &nbsp;{this.state.question.questionTitle}
                                                    </span>
                                                </span>

                                            <hr/>
                                            <p>{this.state.question.questionContent}</p>
                                        </li>
                                    </ul>
                                }
                                <br/>
                                {/*answers -> to that question*/}
                                {
                                    !this.state.askingQuestion &&  this.state.multipleAnswer && this.state.answers
                                    && this.state.answers.map(answer =>
                                        <div className="post form-inline" key={answer.id}>

                                            <div className="wrap-ut pull-left">
                                                <div className="mx-5 my-5">
                                                    <p>{answer.answerContent}
                                                    </p>
                                                </div>
                                                <div className="clearfix"></div>
                                            </div>
                                            <div className="postinfo pull-left">
                                                <div className="comments">
                                                    <div className="commentbg">
                                                        560
                                                        <div className="mark"></div>
                                                    </div>

                                                </div>
                                                <div className="views"><i className="fa fa-eye"/> 1,568</div>
                                                <div className="time"><i className="fa fa-clock"/>&nbsp;{answer.time}</div>
                                            </div>
                                            <div className="clearfix"></div>
                                        </div>
                                    )
                                }
                                {
                                    !this.state.askingQuestion &&  this.state.multipleAnswer &&
                                    <div>
                                        <textarea name="desc"
                                                  id="desc"
                                                  placeholder="Post New Answer"
                                                  className="form-control"
                                                  value={this.state.newAnswer.answerContent}
                                                  onChange={(e)=>{
                                                      this.setState({
                                                          newAnswer:{
                                                              ...this.state.newAnswer,
                                                              answerContent: e.target.value
                                                          }
                                                      })
                                                  }}
                                        />
                                        <button className="btn btn-primary float-right post-answer"
                                                onClick={this.postAnswer}>POST</button>
                                    </div>
                                }
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">

                                <div className="sidebarblock">
                                    <h3>Student Profile<Link to="/profile"><i className="fa fa-edit float-right"/></Link></h3>
                                    <div className="divline"></div>
                                    <div className="blocktxt">
                                        <ul className="cats">
                                            <li><a>Role: <span className="badge pull-right">{this.state.profile.role}&nbsp;STUDENT</span></a></li>
                                            <li><a>Major: <span className="badge pull-right">{this.state.profile.major}</span></a></li>
                                            <li><a>GPA: <span className="badge pull-right">{this.state.profile.gpa}</span></a></li>
                                            <li><a>Education Level: <span className="badge pull-right">{this.state.profile.educationLevel}</span></a></li>
                                            <li><a>Current School: <span className="badge pull-right">{this.state.profile.currentSchool}</span></a></li>

                                        </ul>

                                    </div>

                                </div>

                                <div className="sidebarblock">
                                    <h3>University Information</h3>
                                    <div className="divline"></div>
                                    <div className="blocktxt">
                                        <form action="#" method="post" className="form">
                                            <table className="poll">
                                                <tr>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar color1" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "90%"}}>
                                                                Internship/Coop Service
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="chbox">
                                                        <input id="opt1" type="radio" name="opt" value="1"/>
                                                        <label for="opt1"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar color2" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "63%"}}>
                                                                Academic Ability
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="chbox">
                                                        <input id="opt2" type="radio" name="opt" value="2" checked/>
                                                        <label for="opt2"></label>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="progress">
                                                            <div className="progress-bar color3" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}} >
                                                                Tuition Fee
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="chbox">
                                                        <input id="opt3" type="radio" name="opt" value="3"/>
                                                        <label for="opt3"></label>
                                                    </td>
                                                </tr>
                                                <ul className="cats">
                                                    <li><a>Location: <span className="badge pull-right">Boston, MA</span></a></li>
                                                    <li><a>US News Ranking: <span className="badge pull-right">39</span></a></li>
                                                    <li><a>Preferred Student: <span className="badge pull-right">High GPA</span><span className="badge pull-right">Had Working Experience</span></a></li>
                                                </ul>
                                            </table>
                                        </form>
                                        <p className="smal">Updated date: April, 2020</p>
                                    </div>
                                </div>

                                {/*<div class="sidebarblock">*/}
                                {/*    <h3>My Active Threads</h3>*/}
                                {/*    <div class="divline"></div>*/}
                                {/*    <div class="blocktxt">*/}
                                {/*        <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>*/}
                                {/*    </div>*/}
                                {/*    <div class="divline"></div>*/}
                                {/*    <div class="blocktxt">*/}
                                {/*        <a href="#">Who Wins in the Battle for Power on the Internet?</a>*/}
                                {/*    </div>*/}
                                {/*    <div class="divline"></div>*/}
                                {/*    <div class="blocktxt">*/}
                                {/*        <a href="#">Sony QX10: A Funky, Overpriced Lens Camera for Your Smartphone</a>*/}
                                {/*    </div>*/}
                                {/*    <div class="divline"></div>*/}
                                {/*    <div class="blocktxt">*/}
                                {/*        <a href="#">FedEx Simplifies Shipping for Small Businesses</a>*/}
                                {/*    </div>*/}
                                {/*    <div class="divline"></div>*/}
                                {/*    <div class="blocktxt">*/}
                                {/*        <a href="#">Loud and Brave: Saudi Women Set to Protest Driving Ban</a>*/}
                                {/*    </div>*/}
                                {/*</div>*/}


                            </div>
                        </div>
                    </div>


                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 col-xs-12 form-inline">
                                <div class="float-right"><a href="#" class="prevnext"><i class="fa fa-angle-left"></i></a></div>
                                <div class="float-left">
                                    <ul class="paginationforum">
                                        <li class="hidden-xs"><a href="#">1</a></li>
                                        <li class="hidden-xs"><a href="#">2</a></li>
                                        <li class="hidden-xs"><a href="#">3</a></li>
                                        <li class="hidden-xs"><a href="#">4</a></li>
                                        <li><a href="#">5</a></li>
                                        <li><a href="#">6</a></li>
                                        <li><a href="#" class="active">7</a></li>
                                        <li><a href="#">10</a></li>
                                    </ul>
                                </div>
                                <div class="pull-left"><a href="#" class="prevnext last"><i class="fa fa-angle-right"></i></a></div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>


                </section>

                <footer>
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-1 col-xs-3 col-sm-2 logo "><a href="#"><img src="images/logo.jpg" alt=""  /></a></div>
                            <div class="col-lg-8 col-xs-9 col-sm-5 ">Copyrights 2020, Zheng Feng, Junxiang Zhao, Chencheng Geng, Fengqi Qiao</div>
                            <div class="col-lg-3 col-xs-12 col-sm-5 sociconcent">
                                <ul class="socialicons">
                                    <li><a href="#"><i class="fab fa-weixin"/></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"/></a></li>
                                    <li><a href="#"><i class="fab fa-google-plus"/></a></li>
                                    <li><a href="#"><i class="fab fa-facebook-square"/></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default ForumComponent





// import React from "react";
//
// // test
// class ForumComponent extends React.Component {
//     render() {
//         return(
//             <div className="container-fluid">
//                 <div className="tp-banner-container">
//                     <div className="tp-banner">
//                         <ul>
//                             <li>
//                                 <img src={require("../constants/images/NEU.jpeg")} height="400" className="headerImage"/>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//
//                 <div className="headernav">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-1 col-xs-3 col-sm-2 col-md-2 logo ">
//                                 <a href="index.html"><img src="images/logo.jpg" alt=""/></a>
//                             </div>
//                             <div className="col-lg-3 col-xs-9 col-sm-5 col-md-3 selecttopic">
//                                 <div className="dropdown">
//                                     <a data-toggle="dropdown" href="#">Northeastern University</a>
//                                     <b className="caret"></b>
//                                     {/*<ul className="dropdown-menu" role="menu">*/}
//                                     {/*    <li role="presentation"><a role="menuitem" tabIndex="-1"*/}
//                                     {/*                               href="#">Borderlands 1</a></li>*/}
//                                     {/*    <li role="presentation"><a role="menuitem" tabIndex="-2"*/}
//                                     {/*                               href="#">Borderlands 2</a></li>*/}
//                                     {/*    <li role="presentation"><a role="menuitem" tabIndex="-3"*/}
//                                     {/*                               href="#">Borderlands 3</a></li>*/}
//
//                                     {/*</ul>*/}
//                                 </div>
//                             </div>
//                             <div className="col-lg-4 search hidden-xs hidden-sm col-md-3 form-inline">
//                                         <span className="pull-left txt">
//                                             <input type="text" className="form-control w-75" placeholder="Search Post"/>
//                                         </span>
//                                         <span className="float-right">
//                                             <button className="btn btn-default" type="button"><i className="fa fa-search"/></button>
//                                         </span>
//                             </div>
//                             <div className="col-lg-4 col-xs-12 col-sm-5 col-md-4 avt">
//                                 <div className="stnt pull-left">
//                                     {/*<form action="03_new_topic.html" method="post" className="form">*/}
//                                     {/*    <button className="btn btn-primary">Start New Post</button>*/}
//                                     {/*</form>*/}
//                                         <button className="btn btn-primary">Start New Post</button>
//                                 </div>
//
//                                 <div className="avatar pull-left dropdown">
//                                     <a data-toggle="dropdown" href="#"><img src="images/avatar.jpg" alt=""/></a>
//                                     <b className="caret"></b>
//                                     <div className="status green">&nbsp;</div>
//                                     <ul className="dropdown-menu" role="menu">
//                                         <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">My Profile</a></li>
//                                         <li role="presentation"><a role="menuitem" tabIndex="-2" href="#">Inbox</a></li>
//                                         <li role="presentation"><a role="menuitem" tabIndex="-3" href="#">Log Out</a></li>
//                                         <li role="presentation"><a role="menuitem" tabIndex="-4" href="04_new_account.html">Create account</a></li>
//                                     </ul>
//                                 </div>
//
//                                 <div className="clearfix"></div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 <section className="content">
//                     <div className="container">
//                         <div className="row">
//                             <div className="col-lg-8 col-xs-12 col-md-8 form-inline">
//                                 <div className="pull-left">
//                                     <a href="#" className="prevnext"><i className="fa fa-angle-left"/></a>
//                                 </div>
//                                 <div className="pull-left">
//                                     <ul className="paginationforum">
//                                         <li className="hidden-xs"><a href="#">1</a></li>
//                                         <li className="hidden-xs"><a href="#">2</a></li>
//                                         <li className="hidden-xs"><a href="#">3</a></li>
//                                         <li className="hidden-xs"><a href="#">4</a></li>
//                                         <li><a href="#">5</a></li>
//                                         <li><a href="#">6</a></li>
//                                         <li><a href="#" className="active">7</a></li>
//                                         <li><a href="#">10</a></li>
//                                     </ul>
//                                 </div>
//                                 <div className="pull-left">
//                                     <a href="#" className="prevnext last"><i className="fa fa-angle-right"/></a>
//                                 </div>
//                                 <div className="clearfix"></div>
//                             </div>
//                         </div>
//                     </div>
//
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-8 col-md-8">
//                             <div className="post form-inline">
//                                 <div className="wrap-ut pull-left">
//                                     <div className="mx-5 my-5">
//                                         <h2><a href="02_topic.html">How is Coop service in Northeastern University? </a></h2>
//                                         <p>Undergraduates may participate in co-op after completing three academic semesters and alternate periods
//                                             of academic study with six-month periods of work experience in their field(s) of interest.
//                                             Transfer students are eligible to start co-op after completing at least one academic semester at Northeastern.</p>
//                                     </div>
//                                     <div className="clearfix"></div>
//                                 </div>
//                                 <div className="postinfo pull-left">
//                                     <div className="comments">
//                                         <div className="commentbg">
//                                             560
//                                             <div className="mark"></div>
//                                         </div>
//
//                                     </div>
//                                     <div className="views"><i className="fa fa-eye"/> 1,568</div>
//                                     <div className="time"><i className="fa fa-clock-o"/> 24 min</div>
//                                 </div>
//                                 <div className="clearfix"></div>
//                             </div>
//
//
//                             <div className="post form-inline">
//                                 <div className="wrap-ut pull-left">
//                                     <div className="mx-5 my-5">
//                                         <h2><a href="02_topic.html">Where can I find good restaurant near Northeastern University? </a></h2>
//                                         <p> Top 5: Giacomo's. 0.4 mi. 1278 reviews.
//                                             Conor Larkins Grill & Tap. 1.0 mi. 113 reviews.
//                                             Atlantic Fish Co. 0.5 mi. 2537 reviews.
//                                             Boston Shawarma. 1.0 mi. 571 reviews.
//                                             The Squealing Pig. 1.8 mi. 413 reviews.</p>
//                                     </div>
//                                     <div className="clearfix"></div>
//                                 </div>
//                                 <div className="postinfo pull-left">
//                                     <div className="comments">
//                                         <div className="commentbg">
//                                             89
//                                             <div className="mark"></div>
//                                         </div>
//
//                                     </div>
//                                     <div className="views"><i className="fa fa-eye"/> 1,568</div>
//                                     <div className="time"><i className="fa fa-clock-o"/> 15 min</div>
//                                 </div>
//                                 <div className="clearfix"></div>
//                             </div>
//
//
//                             <div className="post form-inline">
//                                 <div className="wrap-ut pull-left">
//                                     <div className="mx-5 my-5">
//                                         <h2><a href="02_topic.html">Where is the fitting center near Northeastern? </a></h2>
//                                         <p>Marino Recreation Center, 259-269 Huntington Ave, Boston, MA 02115.</p>
//                                     </div>
//                                     <div className="clearfix"></div>
//                                 </div>
//                                 <div className="postinfo pull-left">
//                                     <div className="comments">
//                                         <div className="commentbg">
//                                             456
//                                             <div className="mark"></div>
//                                         </div>
//
//                                     </div>
//                                     <div className="views"><i className="fa fa-eye"/> 1,568</div>
//                                     <div className="time"><i className="fa fa-clock-o"/> 2 days</div>
//                                 </div>
//                                 <div className="clearfix"></div>
//                             </div>
//
//                         </div>
//                         <div className="col-lg-4 col-md-4">
//
//                             <div className="sidebarblock">
//                                 <h3>Student Profile</h3>
//                                 <div className="divline"></div>
//                                 <div className="blocktxt">
//                                     <ul className="cats">
//                                         <li><a>Status: <span className="badge pull-right">Current Student</span></a></li>
//                                         <li><a>Major: <span className="badge pull-right">Computer Science</span></a></li>
//                                         <li><a>GPA: <span className="badge pull-right">3.88</span></a></li>
//                                         <li><a>Education Level: <span className="badge pull-right">Master</span></a></li>
//                                         <li><a>Expected Graduation Year: <span className="badge pull-right">2021</span></a></li>
//                                     </ul>
//                                 </div>
//                             </div>
//
//                             <div className="sidebarblock">
//                                 <h3>University Information</h3>
//                                 <div className="divline"></div>
//                                 <div className="blocktxt">
//                                     <form action="#" method="post" className="form">
//                                         <table className="poll">
//                                             <tr>
//                                                 <td>
//                                                     <div className="progress">
//                                                         <div className="progress-bar color1" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "90%"}}>
//                                                             Internship/Coop Service
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="chbox">
//                                                     <input id="opt1" type="radio" name="opt" value="1"/>
//                                                         <label for="opt1"></label>
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td>
//                                                     <div className="progress">
//                                                         <div className="progress-bar color2" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "63%"}}>
//                                                             Academic Ability
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="chbox">
//                                                     <input id="opt2" type="radio" name="opt" value="2" checked/>
//                                                         <label for="opt2"></label>
//                                                 </td>
//                                             </tr>
//                                             <tr>
//                                                 <td>
//                                                     <div className="progress">
//                                                         <div className="progress-bar color3" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}} >
//                                                             Tuition Fee
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="chbox">
//                                                     <input id="opt3" type="radio" name="opt" value="3"/>
//                                                         <label for="opt3"></label>
//                                                 </td>
//                                             </tr>
//                                             <ul className="cats">
//                                                 <li><a>Location: <span className="badge pull-right">Boston, MA</span></a>
//                                                 </li>
//                                                 <li><a>US News Ranking: <span className="badge pull-right">39</span></a>
//                                                 </li>
//                                                 <li><a>Preferred Student: <span
//                                                     className="badge pull-right">High GPA</span>
//                                                     <span
//                                                         className="badge pull-right">Had Working Experience</span></a>
//                                                 </li>
//                                             </ul>
//                                         </table>
//                                     </form>
//                                     <p className="smal">Updated date: April, 2020</p>
//                                 </div>
//                             </div>
//
//                             {/*<div className="sidebarblock">*/}
//                             {/*    <h3>My Active Threads</h3>*/}
//                             {/*    <div className="divline"></div>*/}
//                             {/*    <div className="blocktxt">*/}
//                             {/*        <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>*/}
//                             {/*    </div>*/}
//                             {/*    <div className="divline"></div>*/}
//                             {/*    <div className="blocktxt">*/}
//                             {/*        <a href="#">Who Wins in the Battle for Power on the Internet?</a>*/}
//                             {/*    </div>*/}
//                             {/*    <div className="divline"></div>*/}
//                             {/*    <div className="blocktxt">*/}
//                             {/*        <a href="#">Sony QX10: A Funky, Overpriced Lens Camera for Your Smartphone</a>*/}
//                             {/*    </div>*/}
//                             {/*    <div className="divline"></div>*/}
//                             {/*    <div className="blocktxt">*/}
//                             {/*        <a href="#">FedEx Simplifies Shipping for Small Businesses</a>*/}
//                             {/*    </div>*/}
//                             {/*    <div className="divline"></div>*/}
//                             {/*    <div className="blocktxt">*/}
//                             {/*        <a href="#">Loud and Brave: Saudi Women Set to Protest Driving Ban</a>*/}
//                             {/*    </div>*/}
//                             {/*</div>*/}
//
//
//                         </div>
//                     </div>
//                 </div>
//
//
//
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-8 col-xs-12 form-inline">
//                             <div className="float-right"><a href="#" className="prevnext"><i className="fa fa-angle-left"/></a></div>
//                             <div className="float-left">
//                                 <ul className="paginationforum">
//                                     <li className="hidden-xs"><a href="#">1</a></li>
//                                     <li className="hidden-xs"><a href="#">2</a></li>
//                                     <li className="hidden-xs"><a href="#">3</a></li>
//                                     <li className="hidden-xs"><a href="#">4</a></li>
//                                     <li><a href="#">5</a></li>
//                                     <li><a href="#">6</a></li>
//                                     <li><a href="#" className="active">7</a></li>
//                                     <li><a href="#">10</a></li>
//                                 </ul>
//                             </div>
//                             <div className="pull-left"><a href="#" className="prevnext last"><i className="fa fa-angle-right"/></a></div>
//                             <div className="clearfix"></div>
//                         </div>
//                     </div>
//                 </div>
//
//
//             </section>
//
//         <footer>
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-1 col-xs-3 col-sm-2 logo "><a href="#"><img src="images/logo.jpg" alt=""  /></a></div>
//                     <div className="col-lg-8 col-xs-9 col-sm-5 ">Copyrights 2020, Zheng Feng, Junxiang Zhao, Chencheng Geng, Fengqi Qiao</div>
//                     <div className="col-lg-3 col-xs-12 col-sm-5 sociconcent">
//                         <ul className="socialicons">
//                             <li><a href="#"><i className="fab fa-weixin"/></a></li>
//                             <li><a href="#"><i className="fab fa-twitter"/></a></li>
//                             <li><a href="#"><i className="fab fa-google-plus"/></a></li>
//                             <li><a href="#"><i className="fab fa-facebook-square"/></a></li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </footer>
//     </div>
//         )
//     }
// }
//
// export default ForumComponent

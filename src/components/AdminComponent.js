import React from "react";
import {deleteQuestion, findAllQuestions} from "../services/QuestionService";
import {Link} from "react-router-dom";
import {logout} from "../services/UserService";

class AdminComponent extends React.Component{
    state = {
        questions: []
    }
    componentDidMount() {
        findAllQuestions()
            .then(questions => this.setState({
                questions: questions
            }))
    }

    logout = () =>
        logout()
            .then(status => {
                this.props.history.push('/')
            });

    render() {
        return(
            <div className="container">
               <h3>
                    <span className="AdminAnswerLogout" onClick={this.logout}>
                        logout
                    </span>
               </h3>
                <ul className="list-group">
                    {
                        this.state.questions && this.state.questions.map(question =>
                            <li className="list-group-item" key={question.id}>
                                <div className="adminTitle">
                                    <Link to={`/admin/questions/${question.id}/answers`}> <i className="far fa-question-circle"/>&nbsp;{question.questionTitle}</Link>
                                    <i className="fa fa-times fa-2x float-right adminIcon" onClick={async ()=>{
                                        await deleteQuestion(question.id)
                                        await findAllQuestions()
                                            .then(questions => this.setState({
                                                questions: questions
                                            }))
                                    }}/>
                                </div>
                                <div className="adminContent">
                                    <i className="fas fa-book"/>&nbsp;{question.questionContent}
                                </div>
                                <div className="adminTime">
                                    <i className="far fa-clock"/>&nbsp;{question.time}
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default AdminComponent

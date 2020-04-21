import React from "react";
import {deleteQuestion, findAllQuestions} from "../services/QuestionService";
import {deleteAnswer, findAnswersForQuestion} from "../services/AnswerService";
import {Link} from "react-router-dom";

class AdminAnswersComponent extends React.Component{
    state = {
        answers: []
    };

    componentDidMount() {
        findAnswersForQuestion(this.props.qid)
            .then(answers => this.setState({
                answers: answers
            }))
    }

    render() {
        return(
            <div className="container">
                <Link to="/admin">
                    Back
                </Link>
                <ul className="list-group">
                    {
                        this.state.answers && this.state.answers.map(answer =>
                            <li className="list-group-item" key={answer.id}>
                                <div className="adminContent">
                                   <i className="far fa-question-circle"/>&nbsp;{answer.answerContent}
                                    <i className="fa fa-times fa-2x float-right adminIcon" onClick={async ()=>{
                                        await deleteAnswer(answer.id);
                                        await findAnswersForQuestion(this.props.qid)
                                            .then(answers => this.setState({
                                                answers: answers
                                            }))
                                    }}/>
                                </div>
                                <div className="adminTime">
                                    <i className="far fa-clock"/>&nbsp;{answer.time}
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }
}

export default AdminAnswersComponent

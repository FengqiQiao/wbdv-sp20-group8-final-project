import React from "react";
import {profile} from "../services/UserService";
import {Link} from "react-router-dom";
import {findUniversityByName} from "../services/UniversityService";
import {createQuestion} from "../services/QuestionService";

class NewQuestionComponent extends React.Component {
    state = {
        newQuestion: {
           questionTitle:'',
           questionContent:'',
           time:'',
           universityId: 0,
        }
    }

    submit = async () => {
        let currentDate = new Date();
        await this.setState({
            newQuestion: {
                ...this.state.newQuestion,
                time: currentDate.toLocaleString('en')
            }
        })
       await findUniversityByName(this.props.universityName)
           .then(res => this.setState({
               newQuestion: {
                   ...this.state.newQuestion,
                   universityId: res.id
           }}))
        createQuestion(this.props.universityName,this.state.newQuestion)
    }
    render() {
        return(
            <div>
                <div className="container">
                    <div>
                        <div>
                            <input type="text"
                                   placeholder="Enter Topic Title"
                                   className="form-control"
                                   value={this.state.newQuestion.questionTitle}
                                   onChange={(e)=>{
                                       this.setState({
                                           newQuestion:{
                                               ...this.state.newQuestion,
                                               questionTitle: e.target.value
                                           }
                                       })
                                   }}
                            />
                        </div>
                        <hr/>
                        <div>
                            <textarea name="desc"
                                      id="desc"
                                      placeholder="Description"
                                      className="form-control"
                                      value={this.state.newQuestion.questionContent}
                                      onChange={(e)=>{
                                          this.setState({
                                              newQuestion:{
                                                  ...this.state.newQuestion,
                                                  questionContent: e.target.value
                                              }
                                          })
                                      }}
                            />
                        </div>
                        <hr/>
                        <button className="btn btn-primary form-control"
                                onClick={this.submit}>POST</button>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>
        )
    }
}

export default NewQuestionComponent

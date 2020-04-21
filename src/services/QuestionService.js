import {API_URL} from "../constants/costants";


export const findAllQuestions = () =>
    fetch(`${API_URL}/api/questions`,{
        // credentials: "include"
    })
        .then(res => res.json())


export const findQuestionsForUniversity = (universityName) =>
    fetch(`${API_URL}/api/universities/${universityName}/questions`
        // credentials: "include"
    ).then(res => res.json())



export const createQuestion = (universityName,newQuestion) =>
    fetch(`${API_URL}/api/universities/${universityName}/questions`, {
        method: "POST",
        body: JSON.stringify(newQuestion),
        headers: {
            'content-type': 'application/json'
        },
        // credentials: "include"
    }).then(response => response.json());

export const findQuestionById = (qid) =>
    fetch(`${API_URL}/api/questions/${qid}`)
        .then(res => res.json());

export const deleteQuestion = (qid) =>
    fetch(`${API_URL}/api/questions/${qid}`,{
        method: "DELETE"
    }).then(response => response.json())


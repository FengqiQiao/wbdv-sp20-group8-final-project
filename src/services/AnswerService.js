import {API_URL} from "../constants/costants";


export const findAllAnswers = () =>
    fetch(`${API_URL}/api/answers`,{
        // credentials: "include"
    })
        .then(res => res.json())


export const findAnswersForQuestion = (qid) =>
    fetch(`${API_URL}/api/questions/${qid}/answers`
        // credentials: "include"
    ).then(res => res.json())

export const deleteAnswer = (aid) =>
    fetch(`${API_URL}/api/answers/${aid}`,{
        method: "DELETE"
    }).then(response => response.json())

export const createAnswer = (qid,newAnswer) =>
    fetch(`${API_URL}/api/questions/${qid}/answers`, {
        method: "POST",
        body: JSON.stringify(newAnswer),
        headers: {
            'content-type': 'application/json'
        },
        // credentials: "include"
    }).then(response => response.json());

import {API_URL} from "../constants/costants";

export const register = (user) =>
    fetch(`${API_URL}/api/register`,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json());

export const login = (user) =>
    fetch(`${API_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response);

export const profile = () =>
    fetch(`${API_URL}/api/profile`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json());

export const logout = () =>
    fetch(`${API_URL}/api/logout`, {
        method: 'POST',
        credentials: "include"
    });

export const update = (user) =>
    fetch(`${API_URL}/api/updateUser`,{
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    })
        .then(res => res.json())
        .then(status => {
            if(status === 0)
                return status
            else
                return login(user)
        })
        .then(res => res.json);

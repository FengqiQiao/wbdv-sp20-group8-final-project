export const register = (user) =>
    fetch(` https://group8-final-project-java.herokuapp.com/register`,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json());

export const login = (user) =>
    fetch(`https://group8-final-project-java.herokuapp.com/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json());

export const profile = () =>
    fetch(`https://group8-final-project-java.herokuapp.com/profile`, {
        method: 'POST',
        // headers: {
        //     'content-type': 'application/json'
        // },
        credentials: "include"
    }).then(response => response.json());

export const logout = () =>
    fetch(`https://group8-final-project-java.herokuapp.com/logout`, {
        method: 'POST',
        credentials: "include"
    });

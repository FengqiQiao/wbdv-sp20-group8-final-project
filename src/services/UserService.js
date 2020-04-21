export const register = (user) =>
    fetch(` http://localhost:8080/register`,{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json());

export const login = (user) =>
    fetch(`http://localhost:8080/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response);

export const profile = () =>
    fetch(`http://localhost:8080/profile`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json());

export const logout = () =>
    fetch(`http://localhost:8080/logout`, {
        method: 'POST',
        credentials: "include"
    });

export const update = (user) =>
    fetch(`http://localhost:8080/updateUser`,{
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

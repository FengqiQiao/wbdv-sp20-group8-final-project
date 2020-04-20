export const findUniversityByName = (uname) => {
    return fetch(`https://group8-final-project-java.herokuapp.com/api/universities/${uname}`,{
        method: 'GET',
        credentials: "include"
    })
        .then(response => response.json())
}

import {API_URL} from "../constants/costants";

export const findUniversityByName = (uname) => {
    return fetch(`${API_URL}/api/universities/${uname}`)
        .then(response => response.json())
};

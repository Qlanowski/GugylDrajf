import { API_URL } from './constants'

export async function signUp(username, email, files) {
    let url = API_URL + `/signup/${username}/${email}`;

    var formData = new FormData();

    for (let file of files) {
        formData.append("audioSample", file);
    }

    var request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.send(formData);
    return request.response;
}

export async function login(username, file) {
    // PRODUCTION
    // let url = API_URL + `api/login/${username}/`;
    // DEBUG
    let url = API_URL + `/login/tokendebug/${username}/`;

    var formData = new FormData();
    formData.append("audioSample", file);

    var request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.send(formData);
    return request.response;
}
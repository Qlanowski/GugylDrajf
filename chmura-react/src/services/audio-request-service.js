import { API_URL } from './constants'

export function signUp(username, email, files) {
    let url = API_URL + `/signup/${username}/${email}`;

    var formData = new FormData();

    for (let file of files) {
        formData.append("audioSample", file);
    }

    return fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.status >= 400 && response.status < 600) {
            throw new Error("Bad response from server");
        }
        return response
    });
}

export function login(username, file) {
    // PRODUCTION
    let url = API_URL + `/login/${username}/`;
    // DEBUG
    //let url = API_URL + `/login/tokendebug/${username}/`;

    var formData = new FormData();
    formData.append("audioSample", file);
    return fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.status >= 400 && response.status < 600) {
            throw new Error("Bad response from server");
        }
        return response.text()
    });
}
const API_URL = 'https://neu1fmwq5k.execute-api.us-east-1.amazonaws.com/';

export async function signUp(username, files) {
    const json = JSON.stringify({
        id: username,
        audioSamples: files,
    });
    response = await fetch(API_URL + 'default/gd-SignUp', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: json
    });
    return await response.json();
}
const API_URL = 'https://neu1fmwq5k.execute-api.us-east-1.amazonaws.com/';

export async function uploadFiles(files, onProgress) {
    const promises = files.map(file => uploadFile(file, onProgress));
    return await Promise.all(promises);
}

function uploadFile(file, onProgress) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        req.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {
                const newProgress =  (event.loaded / event.total) * 100;
                onProgress(file, newProgress);
            }
        });

        req.upload.addEventListener("load", event => {
            resolve(req.response);
        });

        const formData = new FormData();
        formData.append('files', [file]);

        req.open('POST', `${API_URL}files`);
        req.send(formData);
    });
}
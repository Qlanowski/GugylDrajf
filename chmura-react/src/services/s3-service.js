import { API_URL } from './constants';

export async function uploadFiles(files, onProgress, token) {
    const promises = files.map(file => uploadFile(file, onProgress, token));
    return await Promise.all(promises);
}

function uploadFile(file, onProgress, token) {
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
        formData.append('files', file);
        req.open('POST', `${API_URL}/files`);
        req.setRequestHeader('Authorization', `Bearer ${token}`);
        req.send(formData);
    });
}

export async function getUploadedFiles(token) {
    return await fetch(`${API_URL}/files/names`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }).then(response => response.json());
}

export async function downloadFile(name, token) {
    return await fetch(`${API_URL}/files/${name}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
}
import { API_URL } from './constants';
import download from 'downloadjs';

export function uploadFiles(files, onProgress, token) {
    const promises = files.map(file => uploadFile(file, onProgress, token));
    return Promise.all(promises);
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

export function getUploadedFiles(token) {
    return fetch(`${API_URL}/files/names`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }).then(response => response.json());
}

export function getFileUrl(name, token) {
    return fetch(`${API_URL}/files/${name}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      }).then(response => response.text());
}

export function downloadFile(fileUrl) {
    return download(fileUrl);
}

export function deleteFile(name, token) {
    return fetch(`${API_URL}/files/delete/${name}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
}
export function blobsToBase64Data(blobs) {
    let base64files = [];
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = () => {
            let base64data = reader.result;
            base64files.push(base64data);
            if (base64files.length === blobs.length)
                resolve(base64files);
        }
        for (let blob of blobs)
            reader.readAsDataURL(blob);
    });
}
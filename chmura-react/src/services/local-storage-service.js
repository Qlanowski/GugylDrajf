export function setObject(key, value) {
    const stringValue = JSON.stringify(value);
    localStorage.setItem(key, stringValue);
}

export function getObject(key) {
    const stringObj = localStorage.getItem(key);
    return stringObj === null ? null : JSON.parse(stringObj);
}

export function deleteObject(key) {
    localStorage.removeItem(key);
}
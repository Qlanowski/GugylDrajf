import React from 'react';
import { FilesList } from './files-list/files-list-component';
import { FileUpload } from './file-upload/file-upload-component';
export function Files() {
    const files = [{name: "Cos", link:'#link'}, {name: "Cos2", link: "#link2"}];
    return (<div>
        <FileUpload />
        <FilesList files={files}/>
        </div>);
}
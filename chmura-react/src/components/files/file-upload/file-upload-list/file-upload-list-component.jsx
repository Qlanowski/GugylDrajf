import React from 'react';
import { FileUploadListItem } from './file-upload-list-item/file-upload-list-item-component';
import List from '@material-ui/core/List';

export function FileUploadList(props) {
    return (
        <List>
            {
                props.filesToUpload.map((file, index) => <FileUploadListItem name={file.name} progress={file.progress} key={index} />)
            }
        </List>
    );
}
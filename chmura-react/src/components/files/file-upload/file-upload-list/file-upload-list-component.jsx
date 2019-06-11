import React from 'react';
import { FileUploadListItem } from './file-upload-list-item/file-upload-list-item-component';
import List from '@material-ui/core/List';

export function FileUploadList(props) {
    const onItemDelete = (index) => props.itemDeleted(index);
    
    return (
        <List>
            {
                props.filesToUpload.map((file, index) => <FileUploadListItem name={file.name} deleted={() => onItemDelete(index)} uploading={props.uploading} progress={file.progress} key={index} />)
            }
        </List>
    );
}
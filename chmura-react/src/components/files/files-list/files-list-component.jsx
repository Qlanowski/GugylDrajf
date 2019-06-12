import React from "react";
import List from '@material-ui/core/List';
import { FileItem } from './file-item/file-item-component';


export function FilesList(props) {
    const onDownloaded = (file) => props.fileDownloaded(file);
    const onDeleted = (file) => props.fileDeleted(file);

    return (
        <List aria-label="Files list">
            {
                props.files.map((file, index) => <FileItem file={file} deleted={() => onDeleted(file)} key={index} downloaded={() => onDownloaded(file)} />)
            }
        </List>
    );
}
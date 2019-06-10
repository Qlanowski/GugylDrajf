import React from "react";
import List from '@material-ui/core/List';
import { FileItem } from './file-item/file-item-component';


export function FilesList(props) {
    return (
        <List aria-label="Files list">
            {
                props.files.map((file, index) => <FileItem name={file.name} link={file.link} key={index} />)
            }
        </List>
    );
}
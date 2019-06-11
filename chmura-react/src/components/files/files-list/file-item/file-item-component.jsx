import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Styles from './file-item-component.css';


export function FileItem(props) {
    return (
        <ListItem classes={{root: Styles.fileItemElement}}>
            <ListItemText primary={props.name} />
            <ListItemIcon>
                <IconButton onClick={props.downloaded}>
                    <GetAppIcon />
                </IconButton>
            </ListItemIcon>
        </ListItem>
    );
}
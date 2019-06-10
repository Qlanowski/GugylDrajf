import React from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Styles from './file-item-component.css';

function IconButtonLink(props) {
    return <IconButton component="a" {...props} />;
}

export function FileItem(props) {
    return (
        <ListItem classes={{root: Styles.fileItemElement}}>
            <ListItemText primary={props.name} />
            <ListItemIcon>
                <IconButtonLink href={props.link}>
                    <GetAppIcon />
                </IconButtonLink>
            </ListItemIcon>
        </ListItem>
    );
}
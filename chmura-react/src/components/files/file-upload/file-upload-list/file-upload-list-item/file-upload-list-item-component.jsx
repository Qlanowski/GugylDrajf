import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

export function FileUploadListItem(props) {
    console.log(props);
    return (
        <ListItem>
            <ListItemText primary={props.name} />
        <ListItemSecondaryAction>
            <LinearProgress color="primary" variant="determinate" value={props.progress} />
        </ListItemSecondaryAction>
        </ListItem>
    );
}


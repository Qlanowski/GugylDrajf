import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Styles from './file-upload-list-item-component.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export function FileUploadListItem(props) {
    return (
        <ListItem>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
            >
                <Grid item>
                <ListItemText primary={props.name} />
                </Grid>
                <Grid item>
                    {
                        props.uploading ? <LinearProgress color="primary" variant="determinate" value={props.progress} 
                        classes={{root: Styles.fileUploadListItem}} /> : <IconButton onClick={() => props.deleted()}><DeleteIcon /></IconButton>
                    }
                </Grid>
            </Grid>
        </ListItem>
    );
}


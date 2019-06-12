import React, { useState } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import RestoreIcon from '@material-ui/icons/Restore';
import Styles from './file-item-component.css';
import moment from 'moment';
import { AlertDialog } from '../../../shared/alert-dialog/alert-dialog-component';

export function FileItem(props) {
    const [isDeleteAlertOpened, setIsDeleteAlertOpened] = useState(false);
    const onClosed = () => setIsDeleteAlertOpened(false);
    const onAccepted = () => {
        props.deleted();
        onClosed();
    };
    const dialogTitle = 'Do you want to delete this file?';
    const dialogDescription = 'You will not be able to revert this operation.'

    const typoProps = props.file.isArchieved ? {color: 'textSecondary'} : {color: 'textPrimary'};
    const fileName = props.file.isArchieved ? `${props.file.name} (ARCHIEVED)` : props.file.name;
    const dateText = `Uploaded ${moment(props.file.lastModified).fromNow()}`;

    return (
        <ListItem classes={{root: Styles.fileItemElement}}>
            <ListItemText primary={fileName} secondary={dateText} primaryTypographyProps={typoProps} />
            <ListItemIcon>
                <IconButton onClick={() => setIsDeleteAlertOpened(true)}>
                    <DeleteIcon />
                </IconButton>
            </ListItemIcon>
            <ListItemIcon>
            {
                props.file.isArchieved ? 
                <IconButton onClick={props.restored}>
                    <GetAppIcon />
                </IconButton> :
                <IconButton onClick={props.downloaded}>
                    <GetAppIcon />
                </IconButton>
            }
            </ListItemIcon>
            <AlertDialog isOpened={isDeleteAlertOpened} closed={onClosed} accepted={onAccepted} title={dialogTitle}
            description={dialogDescription} />
        </ListItem>
    );
}
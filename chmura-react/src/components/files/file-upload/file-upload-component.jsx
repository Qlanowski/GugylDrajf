import React, { useState } from 'react';
import { FileUploadList } from './file-upload-list/file-upload-list-component';
import { CustomDropzone } from '../../custom-dropzone/custom-dropzone-component';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export function FileUpload(props) {
    const [filesToUpload, setFilesToUpload] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [isSnackbarOpened, setIsSnackbarOpened] = useState(false);

    const onFilesDrop = (files) => {
        const filesWithProgress = files.map(file => {
            file.progress = 0;
            return file;
        });
        const newFiles = filesToUpload.concat(filesWithProgress);
        setFilesToUpload(newFiles);
    }

    const onProgress = (file, progress) => {
        const arrCp = filesToUpload.slice();
        file.progress = progress;
        setFilesToUpload(arrCp);
    }

    const onButtonClick = async () => {
        setUploading(true);
        await props.uploadStarted(filesToUpload, onProgress);
        setFilesToUpload([]);
        setUploading(false);
        setIsSnackbarOpened(true);
    }

    const onItemDeleted = (index) => {
        const filtered = filesToUpload.filter((file, i) => index !== i);
        setFilesToUpload(filtered);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
        setIsSnackbarOpened(false);
    }

    return (
        <div>
            <Typography variant="h3">Upload files</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                    <CustomDropzone onFilesDrop={onFilesDrop} />
                </Grid>
                <Grid item xs={12} lg={8}>
                    <Snackbar
                        variant="success"
                        open={isSnackbarOpened}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                        message={<span>Upload complete!</span>}
                        action={[
                            <IconButton
                                key="close"
                                aria-label="Close"
                                color="inherit"
                                onClick={handleSnackbarClose}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                    <FileUploadList filesToUpload={filesToUpload} uploading={uploading} itemDeleted={onItemDeleted} />
                    {
                        filesToUpload.length ? <Button fullWidth variant="contained" color="primary" onClick={onButtonClick}>Upload files</Button> : null
                    }
                </Grid>
            </Grid>
        </div>
    );
}
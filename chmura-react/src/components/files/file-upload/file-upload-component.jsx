import React, { useState } from 'react';
import { FileUploadList } from './file-upload-list/file-upload-list-component';
import { CustomDropzone } from '../../custom-dropzone/custom-dropzone-component';
import Button from '@material-ui/core/Button';
import { uploadFiles } from '../../../services/s3-service';

export function FileUpload(props) {
    const [filesToUpload, setFilesToUpload] = useState([]);
    
    const onFilesDrop = (files) => {
        const filesWithProgress = files.map(file => {
            file.progress = 0;
            return file;
        });
        const newFiles = filesToUpload.concat(filesWithProgress);
        setFilesToUpload(newFiles);
    }

    const onProgress = (file, progress) => file.progress = progress;
    
    const onButtonClick = async () => await uploadFiles(filesToUpload, onProgress);

    return (
        <div>
        <CustomDropzone onFilesDrop={onFilesDrop} />
        <FileUploadList filesToUpload={filesToUpload} />
        <Button variant="contained" color="primary" onClick={onButtonClick}>Upload file</Button>
        </div>
    );
}
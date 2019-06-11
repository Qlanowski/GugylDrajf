import React, { useState, useEffect } from 'react';
import { FilesList } from './files-list/files-list-component';
import { FileUpload } from './file-upload/file-upload-component';
import { getUploadedFiles } from '../../services/s3-service';
import { useStateValue } from '../../context/user-state-provider';
import { uploadFiles, downloadFile } from '../../services/s3-service';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Styles from './files-component.css';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export function Files() {
  const [userState, dispatch] = useStateValue();
  const [userFiles, setUserFiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const files = await getUploadedFiles(userState.token);
      setUserFiles(files);
    }
  }, []);

  const onUploadStarted = async (files, onProgress) => {
    await uploadFiles(files, onProgress, userState.token);
    const newFiles = userFiles.concat(files.map(file => file.name));
    setUserFiles(newFiles);
  }

  const onFileDownloaded = async (file) => {
    const result = await downloadFile(file, userState.token);
    console.log(result);
  }

  return (<div>
    <Button onClick={handleOpen} variant="outlined" size="large" color="primary" className={Styles.uploadButton} fullWidth>
      Upload files
    </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={Styles.uploadPaper}>
          <FileUpload uploadStarted={onUploadStarted} />
        </div>
      </Modal>
    <Typography className={Styles.header} variant="h2">Your files</Typography>
    <FilesList files={userFiles}  fileDownloaded={onFileDownloaded} />
  </div>);
}
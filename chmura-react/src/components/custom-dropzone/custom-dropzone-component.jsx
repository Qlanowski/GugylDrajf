import React, { useCallback } from 'react'
import Dropzone from 'react-dropzone'
import BackupIcon from '@material-ui/icons/Backup'
import IconButton from '@material-ui/core/IconButton'
import Styles from './custom-dropzone-component.css'
export function CustomDropzone(props) {
    return (
        <Dropzone onDrop={acceptedFiles => props.onFilesDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps, isDragActive, isDragAccept }) => (
                <section>
                    <div style={{textAlign: 'center'}} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <IconButton color="primary" classes={{root: Styles.uploadIcon, colorPrimary: isDragAccept ? Styles.acceptIcon : ''}}>
                            <BackupIcon fontSize="large" classes={{fontSizeLarge: Styles.fileUploadIconLarge}}/>
                        </IconButton>
                        <p style={{textAlign: 'center', fontSize: '1.5em', marginTop: '15px'}}>Drag files or click on the icon</p>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}
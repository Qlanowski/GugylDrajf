import React, { useCallback } from 'react'
import Dropzone from 'react-dropzone'

export function CustomDropzone(props) {
    return (
        <Dropzone onDrop={acceptedFiles => props.onFilesDrop(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                </section>
            )}
        </Dropzone>
    )
}
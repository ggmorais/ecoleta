import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import './styles.css';

interface DropzoneProps {
  onFileUploaded: (file: File) => void,
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded }) => {

  const [selectedFileUrl, setSelectedFileUrl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];

    setSelectedFileUrl(URL.createObjectURL(file));
    onFileUploaded(file);
  }, [onFileUploaded])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUrl 
        ?  <img src={selectedFileUrl} alt="Establishment Picture" />
        : (
          <p>
            <FiUpload />
            Establishment picture
          </p>
        )
      }
    </div>
  )
}

export default Dropzone;
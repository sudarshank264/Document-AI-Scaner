import React, { useState } from 'react';
import { uploadDocument } from '../api';

function Upload() {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        const token = localStorage.getItem('token');
        if (!file || !token) return;
        const res = await uploadDocument(file, token);
        alert(res.message);
    };

    return (
        <div>
            <h2>Upload Document</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default Upload;

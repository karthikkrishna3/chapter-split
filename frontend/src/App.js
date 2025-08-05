import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [chapterLinks, setChapterLinks] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        handleUpload(e.target.files[0]);
    };

    const handleUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        setMessage('Processing...');

        try {
            const res = await axios.post('http://localhost:8000/upload/', formData);
            setMessage('Chapters created!');
            setChapterLinks(res.data.chapter_files || []);
        } catch {
            setMessage('Upload failed.');
        }
    };

    return (
        <div className="container">
            <h1 className="title">📖 Chapter Split</h1>
            <input type="file" onChange={handleFileChange} />
            <p>{message}</p>
            <ul>{chapterLinks.map((link, idx) => (<li key={idx}><a href={`http://localhost:8000/${link}`} download>{link}</a></li>))}</ul>
        </div>
    );
}
export default App;

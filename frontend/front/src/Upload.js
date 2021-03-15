import React, { useState } from 'react';

function Upload() {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose file');

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('myImage', file);

    try {
      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
    } catch (err) {
      console.err('Request failed.');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="custom-file mb-4">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          onChange={onChange}
          name="myImage"
        />
        <label className="custom-file-label" htmlFor="customFile">
          Choose file
        </label>
        <br></br>
        <button type="submit" className="btn btn-primary mt-4">
          Upload
        </button>
        <img src="http://localhost:5000/jpg.jpg" />
      </div>
    </form>
  );
}

export default Upload;

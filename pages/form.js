'use client';
import { useState } from 'react';

export default function UploadForm() {
  const [blob, setBlob] = useState(null);

  return (
    <>
      <form
        action="/api/upload"
        method="POST"
        encType="multipart/form-data"
        onSubmit={async (event) => {
          event.preventDefault();

          const formData = new FormData(event.currentTarget);
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          const blob = await response.json();
          setBlob(blob);
        }}
      >
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
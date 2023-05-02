'use client';
import { useState } from 'react';

export default function Index() {
  const [blob, setBlob] = useState(null);

  const [base64, setBase64] = useState(null);

  // watch id file change and convert to base64
  // const handleFileChange = (event) => {
  const handleFileChange = async (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      const base64String = reader.result

      setBase64(base64String);
    };

    // use formData and get back blob
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const blob = await response.json();
    setBlob(blob);
    
  };

  return (
    <main class="w-screen h-screen text-white">
     
      <form
        id="form"
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
        className="max-w-lg lg:max-w-2xl mx-auto h-screen flex flex-col justify-center space-y-6"
      >
        <div>
          <h1 class="text-4xl font-black">Quick Share</h1>
          <h2 class="text-3xl font-bold">All formats accepted.</h2>
        </div>

        <input type="file" name="file" id="file" onChange={handleFileChange} />

        {
          blob ? (
            <>
              {/* Remote Preview if it is img / audio / video */}
              {/* if is image */}
              {base64 && base64.includes('data:image') && (
                <img src={blob.url} className="mx-auto rounded-xl max-h-[50vh] hover:scale-105 transition-all" />
              )}
              {/* if is audio */}
              {base64 && base64.includes('data:audio') && (
                <audio src={blob.url} controls className="mx-auto rounded-xl max-h-[50vh] hover:scale-105 transition-all" />
              )}
              {/* if is video */}
              {base64 && base64.includes('data:video') && (
                <video src={blob.url} controls className="mx-auto rounded-xl max-h-[50vh] hover:scale-105 transition-all" />
              )}
              <div
                className="rounded-xl bg-black text-sm p-5 font-semibold shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Share to frineds:
                <br />
                <a href={'/preview?q=' + blob.url.replace('https://public.blob.vercel-storage.com/', '')} target="_blank" className="text-xs block">{window.location + 'preview?q=' + blob.url.replace('https://public.blob.vercel-storage.com/', '')}</a>
                <hr class="relative my-3 opacity-50" />
                Direct Download / Embed to your website:
                <br />
                <a href={blob.url} target="_blank" className="text-xs">{blob.url}</a>
              </div>
            </>
          ) : (<>
            {/* Local Preview if it is img / audio / video */}
            {/* if is image */}
            {base64 && base64.includes('data:image') && (
              <img src={base64} className="mx-auto rounded-xl hover:scale-105 max-h-[50vh] transition-all" />
            )}
            {/* if is audio */}
            {base64 && base64.includes('data:audio') && (
              <audio src={base64} controls className="mx-auto rounded-xl hover:scale-105 max-h-[50vh] transition-all" />
            )}
            {/* if is video */}
            {base64 && base64.includes('data:video') && (
              <video src={base64} controls className="mx-auto rounded-xl hover:scale-105 max-h-[50vh] transition-all" />
            )}
          </>)
        }

      </form>

      <img src="bg.jpg" class={`fixed top-0 w-full h-full -z-[1] object-cover filter ${base64 ? 'brightness-[0.1]' : 'brightness-50'} transition-all`} />
    </main>
  );
}
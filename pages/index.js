'use client';
import { useState } from 'react';

export default function Index() {
  const [loading, setLoading] = useState(false);

  const [blob, setBlob] = useState(null);

  const [base64, setBase64] = useState(null);

  const handleFileChange = async (event) => {
    setLoading(true);

    event.preventDefault();

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      const base64String = reader.result

      setBase64(base64String);
    };

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const blob = await response.json()
    .catch((error) => {
      alert('Error: ' + error);
      window.location.reload();
    });

    setBlob(blob);

    setLoading(false);
  };

  return (
    <main className="w-screen h-screen text-white">
     
      <form
        id="form"
        encType="multipart/form-data"
        className="max-w-lg lg:max-w-2xl mx-auto h-screen flex flex-col justify-center space-y-6"
      >
        <div>
          <h1 className="text-4xl font-black">Quick Share</h1>
          <h2 className="text-3xl font-bold">All formats accepted.</h2>
        </div>

        <input type="file" name="file" id="file" onChange={handleFileChange} />

        {
          !loading && blob ? (
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
                <hr className="relative my-3 opacity-50" />
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

            {loading && (
              <div className="rounded-xl bg-black text-sm p-5 font-semibold shadow-sm animate-pulse hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600">
                Processing your file, please wait...
              </div>
            )}
          </>)
        }

      </form>

      <img src="bg.jpg" className={`fixed top-0 w-full h-full -z-[1] object-cover filter ${base64 ? 'brightness-[0.1]' : 'brightness-50'} transition-all`} />
    </main>
  );
}
'use client';
import { useRouter } from 'next/router';

export default function Preview() {

  const url = 'https://public.blob.vercel-storage.com/' + useRouter().query.q;

  return (
    <main class="w-screen h-screen">
      {/* if is image */}
      {url && url.includes('.jpeg') && (
        <img src={url} className="w-full mx-auto rounded-xl hover:scale-105 transition-all" />
      )}
      {/* if is audio */}
      {url && url.includes('data:audio') && (
        <audio src={url} controls className="w-full mx-auto rounded-xl hover:scale-105 transition-all" />
      )}
      {/* if is video */}
      {url && url.includes('data:video') && (
        <video src={url} controls className="w-full mx-auto rounded-xl hover:scale-105 transition-all" />
      )}
      
    </main>
  );
}
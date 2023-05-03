'use client';
import { useRouter } from 'next/router';

export default function Preview() {

  const url = 'https://public.blob.vercel-storage.com/' + useRouter().query.q;

  return (
    <main className="w-screen h-screen">
      {/* if is image */}
      {url && (url.includes('.jpeg') || url.includes('.jpg') || url.includes('.png'))
      && (
        <img src={url} className="h-full rounded-xl object-cover hover:scale-105 transition-all" />
      )}
      {/* if is audio */}
      {url && (url.includes('.mp3') || url.includes('.wav') || url.includes('.ogg')) && (
        <audio src={url} controls className="h-full rounded-xl object-cover hover:scale-105 transition-all" />
      )}
      {/* if is video */}
      {url && (url.includes('.mp4') || url.includes('.webm') || url.includes('.ogg')) && (
        <video src={url} controls className="h-full rounded-xl object-cover hover:scale-105 transition-all" />
      )}
      
    </main>
  );
}
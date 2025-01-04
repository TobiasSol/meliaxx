import { useState, useEffect } from 'react';

export default function InstagramFeed() {
  const localImages = [
    '/videos/img1.png',
    '/videos/img2.png',
    '/videos/img4.png',
    '/videos/img5.png',
    '/videos/img6.png',
    '/videos/img7.png'
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {localImages.map((image, index) => (
        <a
          href="https://www.instagram.com/me.lia.x"
          target="_blank"
          rel="noopener noreferrer"
          key={index}
          className="block aspect-square relative group overflow-hidden rounded-lg"
        >
          <img
            src={image}
            alt={`Meliax Instagram ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 text-white text-center p-4">
              <p className="text-lg font-bold">
                MELIAX
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
} 
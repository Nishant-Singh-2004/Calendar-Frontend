'use client';

import { useState } from 'react';
import { Image as ImageIcon, RefreshCw } from 'lucide-react';

const IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    alt: 'Mountain landscape',
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop',
    alt: 'Forest path',
  },
  {
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop',
    alt: 'Sunrise over hills',
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop',
    alt: 'Beach paradise',
  },
];

interface HeroImageProps {
  currentMonth: Date;
}

export default function HeroImage({ currentMonth }: HeroImageProps) {
  const [imageIndex, setImageIndex] = useState(0);
  
  const cycleImage = () => {
    setImageIndex((prev) => (prev + 1) % IMAGES.length);
  };
  
  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-2xl shadow-md">
        <img
          src={IMAGES[imageIndex].url}
          alt={IMAGES[imageIndex].alt}
          className="w-full h-48 md:h-56 object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <button
        onClick={cycleImage}
        className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200"
        aria-label="Change image"
      >
        <RefreshCw className="w-4 h-4 text-stone-700" />
      </button>
      
      <div className="pushpin absolute left-1/2 transform -translate-x-1/2 -top-2 z-10" />
    </div>
  );
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  genre_ids: number[];
  overview: string;
  video: string | null;
  release_date: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
  genres: { [id: number]: string };
  onSelect: (movie: Movie) => void;
}

export default function MovieCard({ movie, genres, onSelect }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/movie.png';

  const movieGenres =
    movie.genre_ids
      .map((id) => genres[id])
      .filter(Boolean)
      .slice(0, 2)
      .join(' • ') || 'Genre not available';

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'Year not available';

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <motion.div
      className='relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer w-full sm:w-auto'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(movie)}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={posterUrl}
        alt={movie.title}
        className='w-full h-full object-cover'
        width={500}
        height={500}
      />
      <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4'>
        <h3 className='text-white text-lg font-bold mb-1 line-clamp-2'>
          {movie.title}
        </h3>
        <p className='text-gray-300 text-sm'>{movieGenres}</p>
        <div className='flex items-center mt-2'>
          <div className='bg-yellow-500 text-black px-2 py-1 rounded text-sm mr-2'>
            IMDb {rating}
          </div>
          <span className='text-white text-sm'>{year}</span>
        </div>
      </div>
      {isHovered && (
        <motion.div
          className='absolute inset-0 bg-black bg-opacity-75 p-4 flex flex-col justify-end hidden sm:flex'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className='text-white text-xl font-bold mb-2'>{movie.title}</h3>
          <div className='flex items-center text-sm text-gray-300 mb-2'>
            <span className='mr-2'>{year}</span>
            <span className='mr-2'>•</span>
            <span>{movieGenres}</span>
          </div>
          <p className='text-gray-300 text-sm mb-2 line-clamp-3'>
            {movie.overview || 'No overview available'}
          </p>
          <div className='flex items-center'>
            <div className='bg-yellow-500 text-black px-2 py-1 rounded text-sm mr-2'>
              IMDb {rating}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

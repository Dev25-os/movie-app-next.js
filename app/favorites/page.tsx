"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Fetch favorite movies from local storage on component mount
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  const handleRemoveFavorite = (title) => {
    // Remove a movie from favorites in local storage and update state
    const updatedFavorites = favoriteMovies.filter((movie) => movie.title !== title);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoriteMovies(updatedFavorites);
  };

  return (
    <div>
      <div className="filter flex items-center justify-between sticky top-0 bg-white shadow-md z-50 p-2">
        <Link href={"/"} className="text-black font-semibold pl-2">
          Movie App
        </Link>
      </div>
      
      <h1 className="pt-4 font-semibold px-3">Favorite Movies</h1>

      {favoriteMovies.length === 0 && (
        <p className="px-3 py-2 text-gray-600">You have no favorite movies.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {favoriteMovies.map((movie) => (
          <div key={movie.title} className="max-w-xs rounded overflow-hidden shadow-lg">
            <div className="relative">
              <img
                className="w-full"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleRemoveFavorite(movie.title)}
                  className="text-gray-800 hover:text-red-500 focus:outline-none"
                >
                  <IoMdHeart size={22} className="text-red-500" />
                </button>
              </div>
            </div>
            <div className="px-2 py-2">
              <p className="font-bold text-gray-800">{movie.title}</p>
              <p className="text-gray-700 text-xs">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;

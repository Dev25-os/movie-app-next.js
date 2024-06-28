"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IoBookmark } from "react-icons/io5";

const Wishlist = () => {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  useEffect(() => {
    // Fetch wishlist movies from local storage on component mount
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlistMovies(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (title) => {
    // Remove a movie from wishlist in local storage and update state
    const updatedWishlist = wishlistMovies.filter((movie) => movie.title !== title);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlistMovies(updatedWishlist);
  };

  return (
    <div>
      <div className="filter flex items-center justify-between sticky top-0 bg-white shadow-md z-50 p-2">
        <Link href={"/"} className="text-black font-semibold pl-2">
          Movie App
        </Link>
      </div>

      <h1 className="pt-4 font-semibold px-3">Wishlist</h1>

      {wishlistMovies.length === 0 && (
        <p className="px-3 py-2 text-gray-600">Your wishlist is empty.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {wishlistMovies.map((movie) => (
          <div key={movie.title} className="max-w-xs rounded overflow-hidden shadow-lg">
            <div className="relative">
              <img
                className="w-full"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleRemoveFromWishlist(movie.title)}
                  className="text-gray-800 hover:text-blue-500 focus:outline-none"
                >
                  <IoBookmark size={22} className="text-blue-500" />
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

export default Wishlist;

"use client";
import { useState } from "react";
import { MovieItem } from "@/utils/types";

import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

const MovieCard = ({
  original_title,
  title,
  poster_path,
  video,
  release_date,
  vote_count,
  vote_average,
}: MovieItem) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [rating, setRating] = useState(0); // State to store the selected rating, default to 0

  // Function to handle selecting a star rating
  const handleSetRating = (value) => {
    setRating(value);
  };

  // JSX for star icons
  const renderStarIcons = (maxStars) => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleSetRating(i)}
          className={`cursor-pointer text-yellow-400 ${
            rating >= i ? "fill-current" : ""
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // Example: render 5 stars
  const maxStars = 5;

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <div className="relative">
        <img
          className="w-full"
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
        />
        <div className="hover:bg-black/20 w-full absolute bottom-0 py-1">
          <p className="font-bold pl-2 text-white">{title}</p>
        </div>
      </div>

      <div className="px-2 py-2">
        <p className="text-gray-700 text-xs">{release_date}</p>
      </div>

      <div className="flex items-center justify-between px-2 pb-1">
        <div className="rating">{renderStarIcons(maxStars)}</div>
        <div className="action flex items-center gap-2">
          <div
            onClick={handleToggleFavorite}
            className="flex items-center flex-col cursor-pointer"
          >
            {isFavorite ? (
              <IoMdHeart size={22} className="text-red-500" />
            ) : (
              <IoMdHeartEmpty size={22} />
            )}
            <p className="text-xs">Favorite</p>
          </div>
          <div
            onClick={handleToggleWishlist}
            className="flex items-center flex-col cursor-pointer"
          >
            {isWishlist ? (
              <IoBookmark size={22} className="text-blue-500" />
            ) : (
              <IoBookmarkOutline size={22} />
            )}
            <p className="text-xs">Wishlist</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

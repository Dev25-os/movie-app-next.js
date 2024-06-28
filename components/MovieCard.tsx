import { useEffect, useState } from "react";
import { MovieItem } from "@/utils/types";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

const MovieCard = ({ title, poster_path, release_date }: MovieItem) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [rating, setRating] = useState(0); 

  const handleSetRating = (value: number) => {
    setRating(value);
  };

  const renderStarIcons = (maxStars: number) => {
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

  const maxStars = 5;

  useEffect(() => {
    const storedFavoritesJson = localStorage.getItem("favorites");
    const storedFavorites: MovieItem[] = storedFavoritesJson
      ? JSON.parse(storedFavoritesJson)
      : [];

    // const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const storedWishlistJson = localStorage.getItem("wishlist");
    const storedWishlist: MovieItem[] = storedWishlistJson
      ? JSON.parse(storedWishlistJson)
      : [];
    // const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    setIsFavorite(storedFavorites.some((movie) => movie.title === title));
    setIsWishlist(storedWishlist.some((movie) => movie.title === title));
  }, [title]);

  const handleToggleFavorite = () => {
    const storedFavoritesJson = localStorage.getItem("favorites");
    const storedFavorites: MovieItem[] = storedFavoritesJson
      ? JSON.parse(storedFavoritesJson)
      : [];
    // const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites = [];

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = storedFavorites.filter(
        (movie) => movie.title !== title
      );
    } else {
      // Add to favorites
      updatedFavorites = [
        ...storedFavorites,
        { title, poster_path, release_date },
      ];
    }

    setIsFavorite(!isFavorite);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleToggleWishlist = () => {
    const storedWishlistJson = localStorage.getItem("wishlist");
    const storedWishlist: MovieItem[] = storedWishlistJson
      ? JSON.parse(storedWishlistJson)
      : [];

    // const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let updatedWishlist = [];

    if (isWishlist) {
      updatedWishlist = storedWishlist.filter(
        (movie: MovieItem) => movie.title !== title
      );
    } else {
      updatedWishlist = [
        ...storedWishlist,
        { title, poster_path, release_date },
      ];
    }

    setIsWishlist(!isWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
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

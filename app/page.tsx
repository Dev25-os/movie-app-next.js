"use client";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { MovieItem } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/popular?api_key=${process.env.TMDB_API_KEY}`
      );

      setPopularMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="relative">
        <Header setPopularMovies={setPopularMovies} />
      </div>

      <div className="flex flex-col">
        <div className="relative overflow-scroll">
          {popularMovies.map((movie: MovieItem) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>

        <div className="flex items-center justify-between bg-blue-600  px-4 text-center text-white fixed bottom-0 w-full">
          <div className="fav w-full text-center border-r border-white  py-2">
            <p>Favorite</p>
          </div>
          <div className="Wishlist w-full text-center py-2">
            <p>Wishlist</p>
          </div>
        </div>
      </div>
    </>
  );
}

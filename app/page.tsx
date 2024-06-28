"use client";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { MovieItem } from "@/utils/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}&page=${page}`
      );

      // setPopularMovies(response.data.results);
      setPopularMovies([...popularMovies, ...response.data.results]);
      console.log("ppp", response.data.total_pages);

      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    console.log("34");
    let h = window.innerHeight + document.documentElement.scrollTop;
    console.log(h);
    console.log(document.documentElement.offsetHeight);

    if (h > document.documentElement.offsetHeight - 1) {
      if (page == totalPages) {
        setPage((prev) => prev + 1);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

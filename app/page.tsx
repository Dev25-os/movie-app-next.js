"use client";
import Header from "@/components/Header";
import MovieCard from "@/components/MovieCard";
import { MovieItem } from "@/utils/types";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState<MovieItem[]>([]);
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
        <div className="relative  sm:grid sm:grid-cols-3">
          {popularMovies.map((movie: MovieItem) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>

        <div className="flex items-center justify-between bg-blue-600  px-4 text-center text-white fixed bottom-0 w-full">
          <Link href={"/favorites"} className="fav w-full text-center border-r border-white  py-2" 
          >
            <p>Favorite</p>
          </Link>
          <Link href={"/wishlist"} className="Wishlist w-full text-center py-2">
            <p>Wishlist</p>
          </Link>
        </div>
      </div>
    </>
  );
}

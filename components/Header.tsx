"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { type } from "os";

const Header = ({ setPopularMovies }: any) => {
  const [filter, setFilter] = useState(false);
  const [genre, setGenre] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [releaseDateFrom, setReleaseDateFrom] = useState("");
  const [releaseDateTo, setReleaseDateTo] = useState("");
  const [userScoreMin, setUserScoreMin] = useState(0);
  const [userScoreMax, setUserScoreMax] = useState(10);

  const fetchGenre = async () => {
    setGenre([]);
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=9294efc8e8a75f982b51880b836283e1`
      );
      setGenre(res.data.genres);
    } catch (error) {
      console.log("Error While Fetching Genre", error);
    }
  };
  const fetchLanguages = async () => {
    setLanguages([]);
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/configuration/languages?api_key=9294efc8e8a75f982b51880b836283e1`
      );
      console.log("lang", res);
      setLanguages(res.data);
    } catch (error) {
      console.log("Error While Fetching Genre", error);
    }
  };
  useEffect(() => {
    fetchGenre();
    fetchLanguages();
  }, []);

  // Handle genre selection
  const handleGenreSelect = (id) => {
    const index = selectedGenres.indexOf(id);
    if (index === -1) {
      setSelectedGenres([...selectedGenres, id]);
    } else {
      setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id));
    }
  };

  // Handle language selection
  const handleLangChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const handleApplyFilters = async () => {
    let response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=9294efc8e8a75f982b51880b836283e1&with_genres=${selectedGenres}&primary_release_date.gte=${releaseDateFrom}&primary_release_date.lte=${releaseDateTo}&language=${selectedLanguage}`
    );
    setPopularMovies(response.data.results);
  };

  const resetFilter = async () => {
    setSelectedGenres([]);
    setReleaseDateFrom("");
    setReleaseDateTo("");
    setSelectedLanguage("");
    try {
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=9294efc8e8a75f982b51880b836283e1`
      );
      setPopularMovies(response?.data?.results);
    } catch (error) {
      console.log("Error while calling the api", error);
    }
  };

  return (
    <div>
      <div className="filter flex items-center justify-between sticky top-0 bg-white shadow-md z-50">
        <p className="text-black font-semibold pl-2">Movie App</p>
        <div
          className="bg-blue-600 p-2 text-white cursor-pointer"
          onClick={() => setFilter(!filter)}
        >
          <p>Sort & Filter</p>
        </div>
      </div>
      {filter && (
        <div className="absolute bg-white right-0 z-50 w-2/3 shadow-md">
          {/* Genre selection */}
          <div className="px-2 py-4">
            <p className="mb-2 font-semibold">Genres:</p>
            <div className="flex flex-wrap gap-2">
              {genre.map((item) => (
                <div
                  key={item.id}
                  className={`cursor-pointer border rounded-full p-1 ${
                    selectedGenres.includes(item.id)
                      ? "bg-blue-600 text-white"
                      : "border-black"
                  }`}
                  onClick={() => handleGenreSelect(item.id)}
                >
                  <p className="text-xs">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Language selection */}
          <div>
            <p>Languages</p>
            <select value={selectedLanguage} onChange={handleLangChange}>
              {languages.map((option, index) => (
                <option
                  key={index}
                  value={option.english_name}
                  style={{
                    backgroundColor:
                      option.english_name === selectedLanguage
                        ? "lightblue"
                        : "white",
                  }}
                >
                  {option.english_name}
                </option>
              ))}
            </select>
          </div>

          {/* Release Date */}
          <div className="px-2 py-4">
            <label className="block mb-1">Release Date:</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={releaseDateFrom}
                onChange={(e) => setReleaseDateFrom(e.target.value)}
                className="border p-1"
              />
              <span> to </span>
              <input
                type="date"
                value={releaseDateTo}
                onChange={(e) => setReleaseDateTo(e.target.value)}
                className="border p-1"
              />
            </div>
          </div>

          {/* User Score */}
          {/* <div className="px-2 py-4">
            <label className="block mb-1">User Score:</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="10"
                value={userScoreMin}
                onChange={(e) => setUserScoreMin(parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-xs">
                {userScoreMin} - {userScoreMax}
              </span>
              <input
                type="range"
                min="0"
                max="10"
                value={userScoreMax}
                onChange={(e) => setUserScoreMax(parseInt(e.target.value))}
                className="w-full"
              />
            </div> 
          </div>*/}

          {/* Apply Filters Button */}
          <div className="px-2 py-4 gap-x-3 flex">
            <button
              onClick={handleApplyFilters}
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Apply
            </button>
            <button
              onClick={resetFilter}
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

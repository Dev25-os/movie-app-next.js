"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Filters = () => {
  const [genre, setGenre] = useState([]);
  const fetchGenre = async () => {
    try {
      let response = await axios.get(`${process.env.BASE_URL}/genre`);
    } catch (error) {
      console.log("error while fetching genre", error);
    }
  };

  useEffect(() => {
    fetchGenre;
  }, []);
  return <div>Filters</div>;
};

export default Filters;

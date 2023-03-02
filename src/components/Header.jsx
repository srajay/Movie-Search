import React, { useState, useEffect } from "react";

import "./header.css";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=bacf5359";
const Header = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    Moviesearch("Ironman");
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const Moviesearch = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const Moviecard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
    return (
      <div className="movie-container" key={imdbID}>
        <div className="movie-container-box">
          <div className="movie-image">
            <img
              src={
                Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"
              }
              alt={Title}
            />
          </div>
          <div className="movie-title">
            <p>{Title}</p>
            <p>{Type}</p>
          </div>
          <p>{Year}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Movies</h1>
      <div className="search-item">
        <input
          value={search}
          type="text"
          onChange={handleChange}
          placeholder="Search your favorite movie"
        ></input>
        <button onClick={() => Moviesearch(search)}>Search</button>
      </div>

      {movies && movies.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <Moviecard key={index} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default Header;

import React from "react";
import Movie from "../components/Movie";
import {useEffect, useState} from "react"
import API_KEY from "../apiKey";

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
      console.log(API_KEY);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const json = await response.json();
      setMovies(json.results);  
      setLoading(false);
    }
    useEffect(() => {
      getMovies();
    }, []);
    return (
      <div>
        {loading ? 
        <div className="d-flex align-items-center mt-5 justify-content-center">
          <strong>Loading...</strong>
          <div className="spinner-border ms-3" role="status" aria-hidden="true"></div>
        </div> : 
        <div className="container mt-3">
          <h1>Today's Top 20 Movies</h1>
          <div className="row justify-content-center gap-5">{movies.map(movie => (
            <Movie className="col-sm-3" key={movie.id} id={movie.id} coverImg={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} summary={movie.overview}/>
            ))}
          </div>
        </div>}
      </div>
    );
}
export default Home;
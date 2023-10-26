import React from "react";
import Movie from "../components/Movie.js";
import { useState } from "react"
import Navigation from "../components/Navigation.js";
import { gql, useQuery } from "@apollo/client";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
      poster_path
      overview
    }
  }
`;

function Home() {
    const {data, loading} = useQuery(ALL_MOVIES);
    const [searchVal, setSearchVal] = useState("");

    return (
      <div>
        <Navigation onChangeSearch={setSearchVal}/>
        {loading ? 
        <div className="d-flex align-items-center mt-5 justify-content-center">
          <strong>Loading...</strong>
          <div className="spinner-border ms-3" role="status" aria-hidden="true"></div>
        </div> : 
        <div className="container mt-3">
          <h1>Today's Top 20 Movies</h1>
          <div className="row justify-content-center gap-5">{data.allMovies.map(function(movie){
            if (movie.title.toLowerCase().includes(searchVal.toLowerCase())) {
              return(
              <Movie className="col-sm-3" key={movie.id} id={movie.id} coverImg={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} title={movie.title} summary={movie.overview}/>)
            }
          })}
          </div>
        </div>}
      </div>
    );
}
export default Home;
import Movie from "../components/Movie";
import {useEffect, useState} from "react"

function Home() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const getMovies = async() => {
      const response = await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=9.0&sort_by=year`
      );
      const json = await response.json();
      setMovies(json.data.movies);
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
            <Movie className="col-sm-3" key={movie.id} id={movie.id} coverImg={movie.medium_cover_image} title={movie.title} summary={movie.summary}/>
            ))}
          </div>
        </div>}
      </div>
    );
}
export default Home;
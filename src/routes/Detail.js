import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_KEY from "../apiKey";


function Detail() {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const [ytKey, setYtKey] = useState();
    const {id} = useParams();
    const getMovie = async () => {
        const json = await(
            await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
        ).json();
        setDetail(json);
        setLoading(false);
    }
    const getVideo = async () => {
        const json = await(
            await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
        ).json();
        for (const video in json.results){
            if(json.results[video].name === "Official Trailer"){
                setYtKey(json.results[video].key);
            }
        }
    }
    useEffect(() => {
        getMovie();
        getVideo();
    }, [])
    return (
    <div>
        {loading ? 
        <div className="d-flex align-items-center mt-5 justify-content-center">
            <strong>Loading...</strong>
            <div className="spinner-border ms-3" role="status" aria-hidden="true"></div>
        </div> : 
        <div className="container d-flex mt-5">
            <img src={`https://image.tmdb.org/t/p/w500${detail.poster_path}`}/>
            <div className="container px-5 me-5 position-relative">
                <div className="d-flex align-items-baseline ">
                    <h1 className="me-2">{detail.title}</h1>
                    <h5 className="me-2">{detail.year}</h5>
                    <strong>(Released: {detail.release_date})</strong>
                </div>
                <div className="d-flex justify-content-between">
                <i className="m-0">{detail.tagline}</i>
                <p className="m-0">Runtime: {detail.runtime} min</p>
                </div>
                <hr className="m-0 mb-3"/>
                <p>{detail.description_full}</p>
                <iframe width="100%" height="365" src={`https://www.youtube.com/embed/${ytKey}`} title="YouTube video player"></iframe>
                <p className="mt-3">{detail.overview}</p>
                <div className="d-flex">
                    <div className="position-absolute bottom-0 start-0">
                        <i className="ms-5">Genre: {detail.genres.map(g => {
                            return `${g.name} `
                        })}</i>
                    </div>
                    <div className="position-absolute bottom-0 end-0">
                        <i className="me-5">Vote Count: {detail.vote_count}</i>
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
    );
}
export default Detail;
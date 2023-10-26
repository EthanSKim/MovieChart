import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_KEY from "../apiKey.js";
import { useQuery, gql } from "@apollo/client";

const GET_DETAIL = gql`
    query getDetail($movieId:Int!) {
        movie(id:$movieId) {
            id
            title
            poster_path
            release_date
            tagline
            runtime
            overview
            genres {
                name
            }
            vote_count
            trailer {
              results {
                key
              }
            }
        }
    }
`

function Detail() {
    const {id} = useParams();
    const {data, loading} = useQuery(GET_DETAIL, {
        variables: {
            "movieId": Number(id)
        }
    });

    console.log(data);
    

    return (
    <div>
        {loading ? 
        <div className="d-flex align-items-center mt-5 justify-content-center">
            <strong>Loading...</strong>
            <div className="spinner-border ms-3" role="status" aria-hidden="true"></div>
        </div> : 
        <div className="container d-flex mt-5">
            <img src={`https://image.tmdb.org/t/p/w500${data.movie.poster_path}`}/>
            <div className="container px-5 me-5 position-relative">
                <div className="d-flex align-items-baseline ">
                    <h1 className="me-2">{data.movie.title}</h1>
                    <strong>(Released: {data.movie.release_date})</strong>
                </div>
                <div className="d-flex justify-content-between">
                <i className="m-0">{data.movie.tagline}</i>
                <p className="m-0">Runtime: {data.movie.runtime} min</p>
                </div>
                <hr className="m-0 mb-3"/>
                <iframe width="100%" height="365" src={`https://www.youtube.com/embed/${data.movie.trailer.results[0].key}`} title="YouTube video player"></iframe>
                <p className="mt-3">{data.movie.overview}</p>
                <div className="d-flex">
                    <div className="position-absolute bottom-0 start-0">
                        <i className="ms-5">Genre: {data.movie.genres.map(g => {
                            return `${g.name} `
                        })}</i>
                    </div>
                    <div className="position-absolute bottom-0 end-0">
                        <i className="me-5">Vote Count: {data.movie.vote_count}</i>
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
    );
}
export default Detail;
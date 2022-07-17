import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Detail() {
    const [loading, setLoading] = useState(true);
    const [detail, setDetail] = useState([]);
    const {id} = useParams();
    const getMovie = async () => {
        const json = await(
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setDetail(json.data.movie);
        setLoading(false);
    }
    useEffect(() => {
        getMovie();
    }, [])
    return (
    <div>
        {loading ? 
        <div className="d-flex align-items-center mt-5 justify-content-center">
            <strong>Loading...</strong>
            <div className="spinner-border ms-3" role="status" aria-hidden="true"></div>
        </div> : 
        <div className="container d-flex mt-5">
            <img src={detail.medium_cover_image}/>
            <div className="container px-5 me-5 position-relative">
                <div className="d-flex align-items-baseline ">
                    <h1 className="me-2">{detail.title}</h1>
                    <h5 className="me-2">{detail.year}</h5>
                    <strong>({detail.like_count} Likes)</strong>
                </div>
                <div className="d-flex justify-content-between">
                <p className="m-0">Ratings: {detail.rating}</p>
                <p className="m-0">Runtime: {detail.runtime} min</p>
                </div>
                <hr className="m-0 mb-3"/>
                <p>{detail.description_full}</p>
                <div className="d-flex">
                    <div className="position-absolute bottom-0 start-0">
                        <i className="ms-5">Genre: {detail.genres.map(g => {
                            return `${g} `
                        })}</i>
                    </div>
                    <div className="position-absolute bottom-0 end-0">
                        <i className="me-5">Download Count: {detail.download_count}</i>
                    </div>
                </div>
            </div>
        </div>
        }
    </div>
    );
}
export default Detail;
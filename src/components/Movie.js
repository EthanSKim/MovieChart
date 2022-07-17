import PropTypes from "prop-types"
import { Link } from "react-router-dom";

function Movie({id, coverImg, title, summary}) {
    return (
          <div className="card" style={{width: 18+'rem'}}>
            <img src={coverImg} className="card-img-top" alt={title}/>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{summary.length > 100 ? `${summary.slice(0, 100)}...` : summary}</p>
              <Link to={`/movie/${id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    )
}

Movie.propTypes = {
    id:PropTypes.number.isRequired,
    coverImg: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
}

export default Movie;
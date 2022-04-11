import React from 'react'
import { movies } from './getMovies.jsx'

export const Banner = () => {
    // console.log(movies.results);

    let movie = movies.results[0];

    return (

        <>

            
            {
                movie.length === 0 ? (<div className="spinner-border mt-20" role="status">
                    <span className="sr-only">Loading...</span>
                </div>) : (<div className='card banner-card' style={{ height: "35rem" }}>
                    <img className="card-img" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={"Loading..."}
                        style={{ padding: "0px", margin: "0px", height: "100%", width: '100%' }}
                    />
                    <div className="card-img-overlay text-dark">
                        <h5>{movie.original_title}</h5>
                        <p className="card-text text-center d-inline-block text-truncate banner-desc" style={{ maxWidth: "50%" }}>{movie.overview}</p>
                    </div>
                </div>)
            }


        </>
    )
}

export default Banner

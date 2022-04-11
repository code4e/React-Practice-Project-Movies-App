import React from 'react'
import { useState, useEffect, useRef } from "react";
// import { movies } from './getMovies'
const axios = require('axios');

let moviesList = [];
let filteredMovies = [];

const Favorites = () => {
  const [genreState, setGenreState] = useState({ genres: [], currGenre: '' });
  const [selectGenre, setSelectGenre] = useState('All Genres');
  const [moviesState, setMoviesState] = useState({ movies: [] });
  useEffect(() => {
    moviesList = JSON.parse(localStorage.getItem("movies") || "[]");
    setMoviesState({
      movies: [...moviesList]
    })

  }, []);



  let genreids = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
    99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery',
    10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
  };

  let tempGenres = [];
  moviesState.movies.map(movie => {
    let genreId = movie.genre_ids[0];
    if (!tempGenres.includes(genreId)) {
      tempGenres.push(genreId);
    }
  });
  tempGenres.unshift('All Genres');

  function updateGenreState() {
    setGenreState({
      genres: [...tempGenres],
      currGenre: 'All Genres'
    })
  }


  function filterGenre(gId) {

    if(gId === 'All Genres'){
      filteredMovies = [...moviesState.movies];
    }else{
      filteredMovies = moviesState.movies.filter(movie => movie.genre_ids[0] === gId);
      console.log(filteredMovies);
    }
  }

  return (
    <div>
      <>
        <div className='main'>
          <div className='row'>
            <div className='col-3'>



              <div className="list-group favorties-genres" id="list-tab" role="tablist">
                <a href="#" className="list-group-item list-group-item-action active" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile" key={1} onClick={() => {updateGenreState(); filterGenre('All Genres') }}>All Genres</a>
                {
                  genreState.genres.map(genreId => (

                    genreId === 'All Genres' ? (
                      <span key={genreId}></span>
                    ) : (
                      <a href="#" className={`list-group-item list-group-item-action`} id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile" onClick={() => {
                        filterGenre(genreId)
                      }} key={genreId}>{genreids[genreId]}</a>
                    )
                  ))
                }




              </div>

            </div>
            <div className='col-9 favorites-table'>
              <div className="row">
                <input type="text" className='input-group-text favorites-input col' />
                <input type="number" className='input-group-text favorites-input col' />
              </div>

              <div className="row">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Title</th>

                      <th scope="col">Genre</th>
                      <th scope="col">Popularity</th>
                      <th scope="col">Rating</th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      filteredMovies.map(movie => (
                        <tr key={movie.id}>

                          <td><img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.original_title} style={{ width: "6rem" }} /> {movie.original_title}</td>

                          <td>{genreids[movie.genre_ids[0]]}</td>
                          <td>{movie.popularity}</td>
                          <td>{movie.vote_average}</td>
                          <td><button type="button" className="btn btn-danger">Delete</button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      </>
    </div >
  )
}

export default Favorites
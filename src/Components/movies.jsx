import React from 'react';
// import { movies as MoviesObj } from './getMovies.jsx';
import { useState, useEffect } from "react";
import { hover } from '@testing-library/user-event/dist/hover';
const axios = require('axios');

const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=e4cf6db45155b1eaa02362b35029c572&language=en-US&page=';

function Movies() {
    // console.log(moviesList);
    const [hoverState, setHoverState] = useState({ hover: '' });
    const [pagesState, setPagesState] = useState({ pages: [1], currPage: 1 });
    const [moviesState, setMovies] = useState({ movies: [] });
    const [favoritesState, setFavoritesState] = useState({favorites :[]});

    useEffect(() => {
        if(pagesState){
            getPage();
        }

        let favs = JSON.parse(localStorage.getItem("movies")) || [];
        let favIds = favs.map(m => m.id);
        setFavoritesState({
            favorites : [...favIds]
        });


    }, [pagesState]);

    async function getPage() {

        // console.log(page);
        try {
            const response = await axios.get(API_URL + pagesState.currPage);
            let data = response.data;
            setMovies({
                movies: [...data.results]
            });


        } catch (error) {
            console.error(error);
        }
    }

    function updateState(cpage) {
        let pagesArr = cpage > pagesState.pages.length ? [...pagesState.pages, cpage] : [...pagesState.pages];
        setPagesState({
            pages: pagesArr,
            currPage: cpage
        })
    }

    function navigatePage(goTo) {
        let cpage = pagesState.currPage;
        if (goTo === 'previous') {
            if (cpage > 1) --cpage;
        } else if (goTo === 'next') {
            ++cpage
        } else {
            cpage = goTo
        }
        updateState(cpage)
    }
    function handleFavorites(movie){
        let favs = JSON.parse(localStorage.getItem("movies")) || [];

        let alreadyExists = favs.some(m => m.id === movie.id);

        if(alreadyExists){
            favs = favs.filter(m => m.id !== movie.id);
        }else{
            favs.push({
                id: movie.id,
                backdrop_path: movie.backdrop_path,
                genre_ids: movie.genre_ids,
                popularity: movie.popularity,
                vote_average: movie.vote_average,
                original_title: movie.original_title
            })
        }

        // if(favs.includes(movie.id)){
        //     favs = favs.filter(mid => mid !== movie.id);
        // }else{
        //     favs.push(movie.id);
        // }
        

        //update RAM
        let favIds = favs.map(m => m.id);
        setFavoritesState({
            favorites : [...favIds]
        });


        //update storage
        localStorage.setItem("movies", JSON.stringify(favs));
        
    }

    return (


        <>
            {
                <div className='d-flex justify-content-center flex-wrap'>
                    {

                        moviesState.movies.length === 0 ? (
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden"></span>
                            </div>
                        ) : (

                            moviesState.movies.map((movie) => (
                                movie && (
                                    <div className="card bg-dark text-white movie-card" style={{ width: "18rem" }} key={movie.id} onMouseEnter={(e) => {
                                        setHoverState({ hover: movie.id })
                                    }} onMouseLeave={() => setHoverState({
                                        hover: ''
                                    })}>
                                        <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top" alt="..." />
                                        <div className="card-img-overlay">
                                            <h5 className="card-title">{movie.original_title}</h5>

                                            {
                                                hoverState.hover === movie.id && (<p className="card-text">
                                                    <button type="button" className="btn btn-outline-secondary btn-sm movie-details-btn" onClick={() => handleFavorites(movie)}>
                                                        {
                                                            favoritesState.favorites.includes(movie.id) ? "Remove from Favorites" : "Add to Favorites"
                                                        } 
                                                    </button>
                                                </p>)
                                            }


                                        </div>
                                    </div>
                                )

                            ))
                        )



                    }


                </div>


            }
            <div className='pagination-container w-100 d-flex justify-content-center'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        {
                            pagesState.currPage > 1 && (
                                <li className="page-item">
                                    <a className="page-link" href="#" onClick={(e) => navigatePage('previous')}>
                                        Previous
                                    </a>
                                </li>
                            )
                        }

                        {
                            

                            pagesState.pages.map(page => (
                                <li className="page-item" key={page}>
                                    <a className={`page-link ${page === pagesState.currPage && "text-danger"
                                        }`} href="#" onClick={(e) => navigatePage(page)}>
                                        {page}
                                    </a>
                                </li>
                            ))


                        }
                        

                        <li className="page-item">
                            <a className="page-link" href="#" onClick={(e) => navigatePage('next')}>
                                Next
                            </a>
                        </li>

                    </ul>
                </nav>
            </div>



        </>
    )
}

export default Movies
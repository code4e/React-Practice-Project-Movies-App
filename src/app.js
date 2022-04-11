import React from 'react';
import { Routes, BrowserRouter as Router, Switch, Route, BrowserRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Banner from './Components/Banner';
import Navbar from './Components/Navbar';
import Movies from './Components/movies';
import Favorites from './Components/Favorites';
import '../src/App.css'

const app = () => {
    return (
        <>

            <Router>

                <Navbar />
                <Routes>
                    <Route path='/' excat element={
                        <>
                            <Banner />
                            <Movies />
                        </>
                    } />
                    <Route path='/favorites' element={<Favorites />} />
                </Routes>



                {/* <Banner />

                <Movies />

                <Favorites /> */}
            </Router>
        </>

    )
}

export default app

//Here is your key: 
// https://api.themoviedb.org/3/movie/550?api_key=e4cf6db45155b1eaa02362b35029c572


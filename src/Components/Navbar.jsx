import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/"><span className="navbar-brand active" href="#">
                    Movies App
                </span></Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">


                    </ul>

                    <Link to="/favorites">
                        <span className="navbar-item active">Favouites</span>
                    </Link>

                </div>
            </nav>


        </>
    )
}

export default Navbar

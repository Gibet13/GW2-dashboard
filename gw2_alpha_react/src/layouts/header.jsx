import React from "react";
import '../assets/header.css'

import { Link } from "react-router-dom";

const header =  <nav id="general_navbar" className="navbar navbar-expand-sm navbar-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                            <Link to="/" ><li className="nav-link">Achievements</li></Link>
                            <Link to="/account"><li className="nav-link">Account</li></Link>
                            <li className="nav-link">BuildCraft</li>
                            </div>
                        </div>
                    </div>
                </nav>;

export default header;

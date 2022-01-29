import React from "react";
import '../assets/header.css'

const header =  <nav id="general_navbar" className="navbar navbar-expand-sm navbar-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">Navbar</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                            <a className="nav-link" aria-current="page" href="">Achievements</a>
                            <a className="nav-link" href="">Account</a>
                            <a className="nav-link" href="">BuildCraft</a>
                            </div>
                        </div>
                    </div>
                </nav>;

export default header;

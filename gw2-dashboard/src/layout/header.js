import React from "react";
import KeyForm from "../components/keyForm";

const Header = () => {
    return (
        <>
            <header>
                <nav className="header-nav">
                    <div className="navlogo">
                        <img src="./images/GW2Dash_logo.png" alt="" />
                    </div>
                    <div className="menu">
                        <button className="menu_button">
                            &#9776;
                        </button>
                        <div className="menu_content">
                            <KeyForm/>
                            <a href="/">Home</a>
                            <a href="/Account">Account</a>
                            <a href="/Achievements">Achievements</a>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;

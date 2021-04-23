import React from 'react';
import { Link } from 'react-router-dom';
import "./css/Home.css";


function Home() {
    return (
        <div id="wrap">
            <div className="slika1">
                <Link to="/muske">
                    <img src="patike/naslovne/nas3.jpg" alt="" />
                </Link>
            </div>
            <div className="slika2">
                <Link to="/zenske">
                    <img src="patike/naslovne/naslov3.jpg" alt="" />
                </Link>
            </div>
            <div className="slika3">
                <Link to="/decije">
                    <img src="patike/naslovne/naslov11.jpg" alt="" />
                </Link>

            </div>
            <div className="senka1">
                <div className="second"></div>
            </div>
            <div className="senka2">
                <div className="second"></div>
            </div>
            <div className="senka3">
                <div className="second"></div>
            </div>

        </div>
    )
}

export default Home;
import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const PrincipalNavbar = () => {
    return (
        <nav className="navbar">
            <div className="container d-inline-flex">
                <div>
                    <Link className="link" to="/">
                        <img src="https://nkhfluid.com/wp-content/uploads/2019/07/47260-67bc60_3155121b10d24a35a4fcb611d3397128mv2_d_3000_3000_s_4_2.png"
                            style={{ width: '60px', height: '60px' }} />
                    </Link>
                    <span className="share-tech-regular">Ir al inicio</span>
                </div>
                <div className="d-inline-flex">
                    <div className="ms-auto">
                        <Link to="/login">
                            <button className="btn share-tech-regular">Login</button>
                        </Link>
                    </div>
                    <div className="ms-3">
                        <Link to="/signup">
                            <button className="btn share-tech-regular">SignUp</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
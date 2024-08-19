import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const PrivateNavbar = () => {
    const { store, actions } = useContext(Context)

    useEffect(() => {
        actions.getSingleUser()
    }, [])

    console.log(store.singleUser)
    console.log(store.singleUser.user?.name)

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
                <div className="d-inline-flex align-items-center">
                    <div className="ms-auto">
                        <span className="share-tech-regular">Bienvenid@ {store.singleUser.user?.name}</span>
                    </div>
                    <div className="ms-3">
                        <button className="btn share-tech-regular" onClick={actions.logout}>Logout</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
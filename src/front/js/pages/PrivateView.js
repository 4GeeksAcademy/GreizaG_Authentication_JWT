import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Footer } from "../component/footer";
import { PrincipalNavbar } from "../component/PrincipalNavbar";
import SparePartCard from "../component/SparePartCard";
import { PrivateNavbar } from "../component/PrivateNavbar";

export const PrivateView = () => {
    const { store, actions } = useContext(Context);

    return (
        <React.Fragment>
            <PrivateNavbar />
            <div className="text-center my-5">
                <h1 className="share-tech-regular"><i class="fa-solid fa-key" style={{ color: '#cc5500' }}></i>  Esta es una ventana privada</h1>
            </div>
        </React.Fragment>
    );
};

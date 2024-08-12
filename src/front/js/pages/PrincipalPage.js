import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Footer } from "../component/footer";
import { PrincipalNavbar } from "../component/PrincipalNavbar";
import SparePartCard from "../component/SparePartCard";

export const PrincipalPage = () => {
    const { store, actions } = useContext(Context);

    let info = [
        { image: "https://i.ebayimg.com/images/g/AMkAAOSwNDZbQwZC/s-l400.jpg", title: "Bujía de encendido" },
        { image: "https://th.bing.com/th/id/OIP.3JPBtV65tVW4mX9TKFWQIAHaFm?rs=1&pid=ImgDetMain", title: "Bobina Logan" },
        { image: "https://www.compraensanjuan.com/fotos_articulos/2128384_1.jpg?v=1682650800", title: "Bobina Duster" },
        { image: "https://th.bing.com/th/id/OIP.HvGQ0ksWSRYHq7yA6NkGyAHaFz?w=921&h=721&rs=1&pid=ImgDetMain", title: "Cables de encendido" },
        { image: "https://i.ebayimg.com/images/g/YREAAOSwgFldwifF/s-l1600.jpg", title: "Sensor de oxígeno" },
        { image: "https://http2.mlstatic.com/D_NQ_NP_788621-MLB32156698187_092019-O.jpg", title: "Sensor MAP" }]

    return (
        <React.Fragment>
            <PrincipalNavbar />
            <div className="text-center my-5">
                <h1 className="share-tech-regular"><i class="fa-solid fa-car-side" style={{ color: '#cc5500' }}></i>  Repuestos para vehículos livianos</h1>
            </div>
            <div class="container-fluid px-5">
                <div className="row">
                    {info.map((value, index) => {
                        return <SparePartCard key={index} image={value.image} title={value.title} description={value.description} />
                    })
                    }
                </div>
            </div>
            {/* <Footer /> */}
        </React.Fragment>
    );
};

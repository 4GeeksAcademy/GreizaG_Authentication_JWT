import React from "react";
import "../../styles/home.css";

const SparePartCard = (props) => {
    return (
        <div class="container justify-content-center col-sm-6 col-md-3 col-lg-2">
            <div className="card mb-3" style={{ maxWidth: "16rem" }}>
                <div className="container d-flex justify-content-center card-header bg-transparent share-tech-regular">
                    {props.title}
                </div>
                <div className="container d-flex justify-content-center card-body text-success">
                    <p className="card-text">
                        <img src={props.image} style={{ width: '120px', height: '120px' }} />
                    </p>
                </div>
                <div className="container d-flex card-footer bg-transparent my-2">
                    <div>
                        <i class="fa-brands fa-gratipay"></i>
                    </div>
                    <div className="ms-auto">
                        <i class="fa-solid fa-cart-arrow-down"></i>
                    </div>
                </div>
            </div>
        </div>

        // <div className="spare-card" style={{ width: '200px', height: '250px' }}>
        //     <div className="spare-card-header py-1 align-items-center">
        //         <p className="text-center share-tech-regular"><b>{props.title}</b></p>
        //     </div>
        //     <div className="spare-card-body">
        //         <img src={props.image} className="card-img-top" alt="Mercedes AMG F1" />
        //         <p class="card-text text-justify my-3">{props.description}</p>
        //     </div>
        //     <div className="spare-card-footer">
        //         <i class="fa-brands fa-gratipay"></i>
        //     </div>
        // </div>
        // <div className="col-sm-6 col-md-3 col-lg-2">
        //     <div class="card">
        //         <div class="card-header">
        //             <p class="text-center"><b>{props.title}</b></p>
        //         </div>
        // <div class="card-body">
        //     <img src={props.image} class="card-img-top" alt="Mercedes AMG F1" />
        //     <div class="card-body pb-5 pt-4">
        //         <p class="card-text text-center my-3">{props.description}</p>
        //     </div>
        //         </div>
        //         <div class="card-footer text-body-secondary">
        //             <i class="fa-brands fa-gratipay"></i>
        //         </div>
        //     </div>
        // </div>

        // <div class="col-sm-6 col-md-3 col-lg-2">
        //     <div class="card">
        //         <img src={props.image} class="card-img-top" alt="Mercedes AMG F1" />
        // <div class="card-body pb-5 pt-4">
        //     <p class="text-center"><b>{props.title}</b></p>
        //     <p class="card-text text-center my-3">{props.description}</p>
        // </div>
        //         <div class="d-flex card-footer justify-content-center">
        //             <i class="fa-brands fa-gratipay"></i>
        //         </div>
        //     </div>
        // </div>
    )
}

export default SparePartCard
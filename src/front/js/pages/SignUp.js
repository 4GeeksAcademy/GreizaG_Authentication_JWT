import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import { NewContactNavbar } from "../component/NewContactNavbar";

export const SignUp = () => {

    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        password: ""
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        actions.newUser(formData);
        navigate("/")
    }

    return (
        <React.Fragment>
            <NewContactNavbar />
            <div className="container new-user">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="new-contact-title name text-center mt-4">
                        <h2>Registro de nuevo usuario</h2>
                    </div>
                    <div className="col-12 input">
                        <label htmlFor="inputName" className="form-label">
                            Nombre
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Nombre"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-12 input">
                        <label htmlFor="inputLastName" className="form-label">
                            Apellido
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputLastName"
                            placeholder="Apellido"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-12 input">
                        <label htmlFor="inputEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail"
                            placeholder="name@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-12 input">
                        <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="inputPassword"
                            placeholder="Contraseña"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="container d-flex col-12 justify-content-center input mt-4">
                        <button type="submit" className="btn">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};
import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { NewContactNavbar } from "../component/NewContactNavbar";

const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage(null);

        const result = await actions.login(email, password);

        if (result.success) {
            console.log("Login exitoso!");
            navigate('/privateview')
        } else {
            setErrorMessage(result.message || "Login no exitoso");
        }
    };

    return (
        <React.Fragment>
            <NewContactNavbar />
            <div className="container new-user">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="new-contact-title name text-center mt-4">
                        <h2>Login</h2>
                    </div>
                    <div className="col-md-12 input">
                        <label htmlFor="inputEmail" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-12 input">
                        <label htmlFor="inputPassword" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <div className="container d-flex col-12 justify-content-center input mt-4">
                        <button type="submit" className="btn">Login</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Login;
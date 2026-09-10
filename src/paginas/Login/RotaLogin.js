import React from "react";
import { Navigate } from "react-router-dom";

export function RotaLogin({ children, tipoUsuario }) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario == null) 
    {
        return <Navigate to="/" />;
    }
    else if (usuario.tipoUsuario !== tipoUsuario && tipoUsuario !== undefined)
    {
        return <Navigate to="/home" />;
    }

    return children;
}
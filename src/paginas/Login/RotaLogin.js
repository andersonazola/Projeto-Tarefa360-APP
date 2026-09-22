import React from "react";
import { Navigate } from "react-router-dom";

export function RotaLogin({ children, tipoUsuario}) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario == null) 
    {
        return <Navigate to="/" />;
    }

    if (tipoUsuario != undefined && usuario.tipoUsuario !== tipoUsuario)
    {
        return <Navigate to="/dashboard" />;
    }

    return children;
}


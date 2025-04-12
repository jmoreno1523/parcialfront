import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Header.css";

export default function Header() {
    const location = useLocation();

    return (
        <header>
            <div className="logo">MarketPlace</div>
            <nav>
                <ul>
                    <li>
                        <Link to="/verHistorial" className={location.pathname === "/verHistorial" ? "active" : ""}>Ver Historial</Link>
                    </li>
                    <li>
                        <Link to="/crearCompra" className={location.pathname === "/crearCompra" ? "active" : ""}>Crear Compra</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
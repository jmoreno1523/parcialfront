import React, { useState, useEffect, use } from "react";
import './styles/AdminHome.css';
import Estadisticas from "./Estadisticas";

export default function AdminHome(){
    const [productos, setProductos] = useState([]);
    const [estadisticasKey, setEstadisticasKey] = useState(0);

    const actualizarEstadisticas = () => {
        setEstadisticasKey(prevKey => prevKey + 1);
    }
    

    const actualizarEstado = async (compraId, nuevoEstado) => {
        try {
            const response = await fetch('http://localhost:4000/pay/actualizarEstado', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ compraId, nuevoEstado }),
            });
    
            const data = await response.json();
            if (data.status === "Success") {
                fetchCompras(); // Recargar la lista de compras
                actualizarEstadisticas(); // Actualizar las estadísticas    

            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
        }
    };
    

    useEffect(() => {{
        fetchCompras();
    }}, []);

    const fetchCompras = async () => {
        try {
            const response = await fetch("http://localhost:4000/pay/getTodasCompras", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return(
        <div className="admin-home">
            <h1>Bienvenido Administrador</h1>
            
            <div className="user-home-table">
                <div className="table-header">
                    <h1>Historial de Compras</h1>
                    <button onClick={() => { fetchCompras(); actualizarEstadisticas(); }} className="refresh-button">
                        Actualizar
                    </button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Usuario</th>
                            <th>Venta</th>
                            <th>Producto</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.fecha}</td>
                                <td>{producto.userEmail}</td>
                                <td>{producto.valor}</td>
                                <td>{producto.producto}</td>
                                <td>
                                    <span className={`estado-tag ${producto.estado === "Aceptado" ? "tag-verde" : "tag-rojo"}`}>
                                        {producto.estado}
                                    </span>
                                </td>
                                <td>
                                    <button className="accion-button" onClick={() => actualizarEstado(producto._id, producto.estado === "Aceptado" ? "Rechazado" : "Aceptado")}>
                                        Cambiar Estado
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="estadisticas-container">
                <Estadisticas key={estadisticasKey} />
            </div>
        </div>
    )
};
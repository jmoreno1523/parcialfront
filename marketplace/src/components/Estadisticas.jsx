import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const Estadisticas = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetch('http://localhost:4000/pay/estadisticas')
            .then((res) => res.json())
            .then((data) => setStats(data));
    }, []);

    if (!stats) return <p>Cargando estadísticas...</p>;

    return (
        <div className="estadisticas">
            <h2>Estadísticas de Ventas</h2>
            <h3>Total de Ventas: ${stats.totalVentas}</h3>

            <h3>Productos Más Vendidos</h3>
            {stats.productosMasVendidos && stats.productosMasVendidos.length > 0 ? (
                <ul>
                    {stats.productosMasVendidos.map((producto, index) => (
                        <li key={index}>
                            {producto._id} - {producto.cantidad} unidades
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay datos disponibles</p>
            )}

            <h3>Ventas Aceptadas vs Rechazadas</h3>
            <PieChart width={400} height={400}>
                <Pie
                    data={stats.comprasPorEstado}
                    dataKey="cantidad"
                    nameKey="_id"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {stats.comprasPorEstado.map((entry, index) => {
                        const color = entry._id === "Aceptado" ? "#28a745" : "#dc3545";
                        return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                </Pie>
                <Tooltip />
            </PieChart>

        </div>
    );
};

export default Estadisticas;

import React, { useState, useEffect } from "react";
import "./styles/UserHome.css";
import ModalCompra from "./ModalCompra";

export default function UserHome({ user }) {
    const [productos, setProductos] = useState([]);
    const [showModalPago, setShowModalPago] = useState(false);
    const toggleModalPago = () => setShowModalPago(!showModalPago);
    const [resultadoPago, setResultadoPago] = useState(null); // Estado para el resultado del pago
    const [showModalResultado, setShowModalResultado] = useState(false); // Estado para mostrar el modal de resultado
    const toggleModalResultado = () => setShowModalResultado(!showModalResultado);
    
    const [form, setForm] = useState({
        userId: user._id || "",
        producto: "",
        valor: 0,
        nombre: "",
        cedula: "",
        telefono: "",
        datosTarjeta: {
            numero: "",
            fecha: "",
            cvv: ""
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        // Verificar si el campo pertenece a los datos de la tarjeta
        if (name === "numero" || name === "fecha" || name === "cvv") {
            setForm((prevForm) => ({
                ...prevForm,
                datosTarjeta: {
                    ...prevForm.datosTarjeta,
                    [name]: value,
                },
            }));
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };

    useEffect(() => {
        fetchCompras();
    }, [user._id]);

        const fetchCompras = async () => {
            try {
                const response = await fetch("http://localhost:4000/pay/getCompras", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId: user._id }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setProductos(data);
                } else {
                    const data = await response.json();
                    alert(data.message);
                }
            } catch (error) {  
                alert("Error al conectar con el servidor");
            }
        };  

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(
            "http://localhost:4000/pay/validatePayment",
            {
          
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify( form ),
            }
          );
    
          if (response.ok) {
            setForm({
                userId: user._id || "",
                producto: '',
                valor: '',
                nombre: '',
                cedula: '',
                telefono: '',
                datosTarjeta: {
                    numero: '',
                    fecha: '',
                    cvv: ''
                }
            });
            setShowModalPago(false); // Cerrar el modal de pago
            const result = await response.json();
            setResultadoPago(result); // Guardar el resultado del pago en el estado
            setShowModalResultado(true); // Mostrar el modal con el resultado
            fetchCompras();
          } else {
            const data = await response.json();
            alert(data.message);
          }
        } catch (error) {
          alert("Error al conectar con el servidor");
        }
      };

    return(
        <>
    
        <div className="user-home">
            <h1>Bienvenido {user.nombre}</h1>
            <form className="user-home-form" onSubmit={handleSubmit}>
                <div className="product-info1">
                    <h2>Crea un Producto</h2>
                    <label htmlFor="producto">Producto</label>
                    <input type="text" name="producto" id="producto" required placeholder="Producto" value={form.producto} onChange={handleChange}/>
                    <label htmlFor="valor">Valor</label>
                    <input type="number" name="valor" id="valor" required placeholder="Valor" value={form.valor} onChange={handleChange}/>
                </div>
                <button onClick={toggleModalPago} type="button" className="logout-button">Pagar</button>
                {showModalPago && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={toggleModalPago}>&times;</span>
                            <div>
                                <div className="product-info">
                                    <div>
                                        <label htmlFor="producto">Producto</label>
                                        <input type="text" disabled name="producto" id="producto" required placeholder="Producto" value={form.producto} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="producto">Valor</label>
                                        <input type="number" disabled name="valor" id="valor" required placeholder="Valor" value={form.valor} onChange={handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2>Informacion Personal</h2>
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" id="nombre" required placeholder="Nombre" value={form.nombre} onChange={handleChange}/>
                                <div className="personal-info">
                                    <div>
                                        <label htmlFor="cedula">Cédula</label>
                                        <input type="number" name="cedula" id="cedula" required placeholder="Cédula" value={form.cedula} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="telefono">Teléfono</label>
                                        <input type="number" name="telefono" id="telefono" required placeholder="Teléfono" value={form.telefono} onChange={handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2>Informacion de Tarjeta</h2>
                                <label htmlFor="numero">Número (9858658998562541)</label>
                                <input type="number" name="numero" id="numero" required placeholder="Número" value={form.datosTarjeta.numero} onChange={handleChange}/>
                                <div className="tarjeta-info">
                                    <div>
                                        <label htmlFor="fecha">Fecha (12/29)</label>
                                        <input type="text" name="fecha" id="fecha" required placeholder="Fecha" value={form.datosTarjeta.fecha} onChange={handleChange}/>
                                    </div>
                                    <div>
                                        <label htmlFor="cvv">CVV (596)</label>
                                        <input type="number" name="cvv" id="cvv" required placeholder="CVV" value={form.datosTarjeta.cvv} onChange={handleChange}/>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="logout-button">Pagar</button>
                        </div>
                    </div>
                )}
            </form>

            <ModalCompra isOpen={showModalResultado} onClose={toggleModalResultado} resultado={resultadoPago} />

            <div className="user-home-table">
                <div className="table-header">
                    <h1>Historial de Compras</h1>
                    <button onClick={() => fetchCompras()} className="refresh-button">Actualizar</button>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Valor</th>
                            <th>Producto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.fecha}</td>
                                <td>{producto.valor}</td>
                                <td>{producto.producto}</td>
                                <td>
                                    <span className={`estado-tag ${producto.estado === "Aceptado" ? "tag-verde" : "tag-rojo"}`}>
                                        {producto.estado}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}
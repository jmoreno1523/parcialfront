import { CheckCircle, XCircle } from 'lucide-react';
import './styles/ModalCompra.css';

const ModalCompra = ({ isOpen, onClose, resultado }) => {
    
    return (
        <>
            {isOpen && <div className="overlayStyle" onClick={onClose} />}
            {isOpen && (
                <div className="modalStyle">
                    {resultado.estado === 'Aceptado' ? (
                        <div>
                            <CheckCircle size={48} color="green" />
                            <h2>Pago Exitoso</h2>
                            <p>Estado: {resultado.estado}</p>
                            <p>Fecha: {resultado.fecha}</p>
                            <p>Producto: {resultado.producto}</p>
                            <p>Valor: ${resultado.valor}</p>
                        </div>
                    ) : (
                        <div>
                            <XCircle size={48} color="red" />
                            <h2>Pago Rechazado</h2>
                            <p>Estado: {resultado.estado}</p>
                            <p>Fecha: {resultado.fecha}</p>
                            <p>Producto: {resultado.producto}</p>
                            <p>Valor: ${resultado.valor}</p>
                            <p style={{ color: 'red' }}>Razón: Verifique los datos de la tarjeta</p>
                        </div>
                    )}
                    <button className="buttonStyle" onClick={onClose}>Cerrar</button>
                </div>
            )}
        </>
    );
};

export default ModalCompra;

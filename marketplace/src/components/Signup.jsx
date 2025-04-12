import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Signup.css';

export default function Signup({ role }) {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', role: role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Usuario creado exitosamente');
                navigate('/Form');  // Redirige al panel de administración
              } else {
                const data = await response.json();
                alert(data.message);
              }
        } catch (error) {
            alert('Error al conectar con el servidor');
        }
  };
  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="h2Signup">Crear una cuenta {role === 'admin' ? 'de Administrador' : 'de Usuario'}</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label id="labelSignup" htmlFor="username">Nombre</label>
                <input type="text" name="username" id="username" autoComplete="username" required placeholder="Nombre" value={formData.username} onChange={handleChange}
                />
            </div>
          <div className="form-group">
            <label id="labelSignup" htmlFor="email">Correo electrónico</label>
            <input type="email" name="email" id="email" autoComplete="email" required placeholder="Correo electrónico" value={formData.email} onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label id="labelSignup" htmlFor="password">Contraseña</label>
            <input type="password" name="password" id="password" autoComplete="new-password" required placeholder="Contraseña" value={formData.password} onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="submit-button">
            Registrarse
          </button>
        </form>
        <div className="login-link">
          <Link to="/Form">¿Ya tienes una cuenta? Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Perfil from './Components/Perfil/Perfil';
import Swal from 'sweetalert2'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    registered: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const response = await fetch('http://localhost:8080/tuCafe/v1/client/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Inicio de sesión exitoso",
          showConfirmButton: false,
          timer: 1500,
          width: '30%',
          didOpen: () => {
            const title = document.querySelector('.swal2-title');
            if (title) {
              title.style.fontSize = '24px'; // Cambia el tamaño del texto según lo necesites
            }
          }
        });
        setFormData({ ...formData, registered: true });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error al iniciar sesión!",
          text: "Por favor verifica tus credenciales!",
          width:  '30%',
          didOpen: () => {
            const title = document.querySelector('.swal2-title');
            const popup = document.querySelector('div.swal2-popup');
            if (title) {
              title.style.fontSize = '24px';
               // Cambia el tamaño del texto según lo necesites
            }
            if (popup) {
              popup.style.fontSize = '13px'; // Cambia el tamaño del texto del contenido según lo necesites
            }
          }
        });
      }
    } catch (error) {
      console.error('Error al conectar con el backend', error);
      toast.error('Error al conectar con el backend');
    }
  };

  if (formData.registered) {
    return <Perfil />;
  }

  return (
    <div className="book1">
      <h2 className="heading">Iniciar Sesión</h2>
      <form className='formL reserva-f' onSubmit={handleSubmit}>
        <label htmlFor="loginEmail" className="boxUS">
          Correo Electrónico:
          <input
            type="text"
            id="loginEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="box1"
          />
        </label>

        <label htmlFor="loginPassword" className="boxUS">
          Contraseña:
          <input
            type="password"
            id="loginPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="box1"
          />
        </label>

        <button type="submit" className="btn">
          Iniciar Sesión
        </button>
      </form>
      <div className='registro'>
        ¿No tienes una cuenta?{' '}
        <Link to="/signup">
          <u><b>Regístrate aquí!</b></u>
        </Link>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Login;

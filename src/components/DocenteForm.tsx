import React, { useState } from 'react';
import { createDocente } from '../services/api';
import styled from 'styled-components';
import { neumorphism } from '../styles/neumorphism';
import '../styles/style.css';

const FormWrapper = styled.form`
  ${neumorphism}
  margin-bottom: 20px;
`;

const DocenteForm: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createDocente({ nombre, apellido, email });
    setNombre('');
    setApellido('');
    setEmail('');
    alert('Docente agregado correctamente');
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <div className="docente-list">
        <div className="docente-info">
          <label className="container">Nombre</label>
          <input 
            type="text" 
            placeholder="Introduce el nombre"
            className="input"
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
          />
        </div>
        <div className="docente-info">
          <label className="container">Apellido</label>
          <input 
            type="text" 
            placeholder="Introduce el apellido"
            className="input"
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)} 
          />
        </div>
        <div className="docente-info">
          <label className="container">E-mail</label>
          <input 
            type="text" 
            placeholder="Introduce el email"
            className="input"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button type="submit">Agregar Docente</button>
      </div>
    </FormWrapper>
  );
};

export default DocenteForm;
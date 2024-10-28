import React, { useState } from 'react';
import { createDocente } from '../services/api';
import styled from 'styled-components';
import { neumorphism } from '../styles/neumorphism';

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
      <div>
        <label>Nombre</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Apellido</label>
        <input value={apellido} onChange={(e) => setApellido(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button type="submit">Agregar Docente</button>
    </FormWrapper>
  );
};

export default DocenteForm;
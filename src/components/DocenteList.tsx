import React, { useEffect, useState } from 'react';
import { deleteDocente, searchDocentes } from '../services/api';
import { useNavigate } from 'react-router-dom'; 
import { Docente } from '../models/types';
import styled from 'styled-components';
import { neumorphism } from '../styles/neumorphism';
import '../styles/style.css';

const FormWrapper = styled.form`
  ${neumorphism}
  margin-bottom: 20px;
`;

const DocenteList: React.FC = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [page, setPage] = useState(0);  // Página actual
  const [totalPages, setTotalPages] = useState(0);  // Total de páginas
  const [size] = useState(10);  // Tamaño por página
  const [search, setSearch] = useState('');  // Término de búsqueda
  const [selectedDocentes, setSelectedDocentes] = useState<number[]>([]);  // IDs seleccionados
  const navigate = useNavigate();  // Hook para la navegación

  useEffect(() => {
    const fetchDocentes = async () => {
      const data = await searchDocentes(page, size, search);
      setDocentes(data.content || []);
      setTotalPages(data.totalPages);  // 'totalPages' contiene el número total de páginas
    };

    fetchDocentes();
  }, [page, size, search]);

  // Manejar la navegación de página
  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0);  // Reiniciar a la primera página cuando cambia el término de búsqueda
  };

  // Manejar la selección de docentes
  const handleSelectDocente = (id: number) => {
    console.log("Seleccionando docente con ID:", id);
    if (selectedDocentes.includes(id)) {
      setSelectedDocentes(selectedDocentes.filter(docenteId => docenteId !== id));  // Quitar de la selección
      console.log("Docente deseleccionado:", id);
    } else {
      setSelectedDocentes([...selectedDocentes, id]);  // Añadir a la selección
      console.log("Docente seleccionado:", id);
    }
    console.log("Estado actual de selectedDocentes:", selectedDocentes);
  };

  // Eliminar los docentes seleccionados
  const handleDeleteSelected = async () => {
    if (selectedDocentes.length > 0) {
      await Promise.all(selectedDocentes.map(id => deleteDocente(id)));  // Eliminar cada docente seleccionado
      setDocentes(docentes.filter(docente => !selectedDocentes.includes(docente.id)));  // Actualizar la lista
      setSelectedDocentes([]);  // Limpiar la selección
      alert('Docentes eliminados correctamente');
    }
  };

  // Función para manejar el clic en "Ver KPI's"
  const handleViewKPIs = (id: number) => {
    navigate(`/docente/${id}/kpis`);  // Navegar a la vista de KPI's del docente
  };

  return (
    <FormWrapper>
    <div>
      <h2>Lista de Docentes</h2>
        <input 
          type="text" 
          placeholder="Buscar por nombre"
          value={search}
          onChange={handleSearchChange}
          className="input"
        />
      <ul>
        {docentes.map(docente => (
          <li key={docente.id} className="docente-item">
            <div className="docente-info">
              <label className="container">
                <input
                  type="checkbox"
                  checked={selectedDocentes.includes(docente.id)}
                  onChange={() => handleSelectDocente(docente.id)}
                />
                <div className="checkmark"></div>
              </label>
              <span>{docente.nombre} {docente.apellido} - {docente.email}</span>
            </div>
            <button onClick={() => handleViewKPIs(docente.id)}>
              Ver KPI's
            </button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Anterior
        </button>
        <span> Página {page + 1} de {totalPages} </span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>
          Siguiente
        </button>
      </div>
      {/* Botón para eliminar los docentes seleccionados */}
      <button onClick={handleDeleteSelected} disabled={selectedDocentes.length === 0}>
        Eliminar Seleccionados
      </button>
    </div>
    </FormWrapper>
  );
};

export default DocenteList;
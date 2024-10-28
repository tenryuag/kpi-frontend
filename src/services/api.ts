import axios from 'axios';
import { DocenteKPI } from '../models/types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',  // URL del backend
});

// Solicitud para obtener todos los docentes
export const getAllDocentes = async (page: number, size: number) => {
    const response = await api.get(`/docentes?page=${page}&size=${size}`);
    return response.data;
};

// Solicitud para crear un docente
export const createDocente = async (docente: { nombre: string; apellido: string; email: string }) => {
  const response = await api.post('/docentes', docente);
  return response.data;
};

// Solicitud para eliminar un docente
export const deleteDocente = async (id: number) => {
  await api.delete(`/docentes/${id}`);
};

// Solicitud para obtener los docentes con paginación y búsqueda
export const searchDocentes = async (page: number, size: number, search: string) => {
  const response = await api.get(`/docentes/search?page=${page}&size=${size}&search=${search}`);
  return response.data;
};


// Obtener todos los KPI's globales
export const getKPIs = async () => {
  const response = await api.get('/kpis');
  return response.data;
};

// Crear un nuevo KPI global
export const createKPI = async (kpi: { nombre: string; descripcion: string }) => {
  const response = await api.post('/kpis', kpi);
  return response.data;
};

// Eliminar un KPI global
export const deleteKPI = async (id: number) => {
  await api.delete(`/kpis/${id}`);
};

// Obtener los KPI's asociados a un docente
export const getDocenteKPIs = async (docenteId: number) => {
  const response = await api.get(`/docente-kpis/${docenteId}`);
  return response.data;
};

// Asociar un KPI a un docente (crear un valor de KPI para un docente)
export const createDocenteKPI = async (docenteKPI: { docenteId: number; kpiId: number; valor: number }) => {
  const response = await api.post('/docente-kpis', docenteKPI);
  return response.data;
};

// Eliminar un KPI asociado a un docente
export const deleteDocenteKPI = async (id: number) => {
  await api.delete(`/docente-kpis/${id}`);
};

// Obtener todos los docentes (para seleccionarlos en el frontend)
export const getDocentes = async () => {
  const response = await api.get('/docentes');
  return response.data;
};

export const updateDocenteKpi = async (docenteKPIId: number, updatedKPI: DocenteKPI) => {
  const response = await api.put(`/docente-kpis/${docenteKPIId}`, updatedKPI, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const getDocenteKpiNames = async (docenteId: number) => {
  const response = await api.get(`/docente-kpis/nombres/${docenteId}`);
  return response.data;
};
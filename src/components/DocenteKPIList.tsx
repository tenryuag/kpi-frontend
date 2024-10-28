import React, { useEffect, useState } from 'react';
import { getDocenteKPIs, getDocentes, updateDocenteKpi } from '../services/api';
import { DocenteKPI, Docente } from '../models/types';

const DocenteKPIList: React.FC = () => {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [selectedDocente, setSelectedDocente] = useState<number | null>(null);
  const [docenteKPIs, setDocenteKPIs] = useState<DocenteKPI[]>([]);

  useEffect(() => {
    const fetchDocentes = async () => {
      const data = await getDocentes();
      setDocentes(data);
    };

    fetchDocentes();
  }, []);

  const handleSelectDocente = async (id: number) => {
    setSelectedDocente(id);
    const data = await getDocenteKPIs(id);
    setDocenteKPIs(data);
  };

  const handleCheckboxChange = (docenteKPIId: number, dayIndex: number) => {
    setDocenteKPIs(prevKpis =>
      prevKpis.map(kpi => {
        if (kpi.id === docenteKPIId) {
          const updatedCumplimiento = [...kpi.cumplimientoDiario];
          updatedCumplimiento[dayIndex] = !updatedCumplimiento[dayIndex];
          return { ...kpi, cumplimientoDiario: updatedCumplimiento };
        }
        return kpi;
      })
    );
  };

  const handleSave = async (docenteKPI: DocenteKPI) => {
    try {
      await updateDocenteKpi(docenteKPI.id, docenteKPI);
      alert("KPI actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el KPI:", error);
    }
  };

  return (
    <div>
      <h2>KPI's por Docente</h2>
      <select onChange={(e) => handleSelectDocente(Number(e.target.value))}>
        <option value="">Selecciona un Docente</option>
        {docentes.map(docente => (
          <option key={docente.id} value={docente.id}>
            {docente.nombre} {docente.apellido}
          </option>
        ))}
      </select>

      {selectedDocente && (
        <table>
          <thead>
            <tr>
              <th>KPI</th>
              <th>Valor</th>
              <th>Objetivo</th>
              <th>Porcentaje Actual</th>
              <th>Total Semanal</th>
              <th>Total Mensual</th>
              <th>Total Trimestral</th>
              <th>Total Anual</th>
              <th>Cumplimiento Diario</th>
            </tr>
          </thead>
          <tbody>
            {docenteKPIs.map(docenteKPI => (
              <tr key={docenteKPI.id}>
                <td>{docenteKPI.kpi.nombre}</td>
                <td>{docenteKPI.valor}</td>
                <td>{docenteKPI.objetivo}</td>
                <td>{docenteKPI.porcentajeActual}%</td>
                <td>{docenteKPI.totalSemanal}</td>
                <td>{docenteKPI.totalMensual}</td>
                <td>{docenteKPI.totalTrimestral}</td>
                <td>{docenteKPI.totalAnual}</td>
                <td>
                  {docenteKPI.cumplimientoDiario.map((cumplido, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        checked={cumplido}
                        onChange={() => handleCheckboxChange(docenteKPI.id, index)}
                      />
                      Día {index + 1}
                    </label>
                  ))}
                </td>
                <td>
                  <button onClick={() => handleSave(docenteKPI)}>Guardar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DocenteKPIList;
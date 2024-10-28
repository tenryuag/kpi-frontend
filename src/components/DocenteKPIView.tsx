import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Para obtener el ID del docente desde la URL
import { getDocenteKPIs, updateDocenteKpi, getDocenteKpiNames } from '../services/api';
import { DocenteKPI, DocenteKpiResponse } from '../models/types';
import '../styles/checkbox.css';


const DocenteKPIView: React.FC = () => {
    const { id } = useParams<{ id: string }>();  // Obtener el ID del docente desde la URL
    const [kpis, setKPIs] = useState<Map<number, DocenteKPI>>(new Map());
    const [nombres, setNombres] = useState<DocenteKpiResponse[]>([]);
    const dayOfWeek = ["月", "火", "水", "木", "金"];

    useEffect(() => {
      const fetchData = async () => {
        if (id) {
            try {
                const [kpiData, nombreData] = await Promise.all([
                    getDocenteKPIs(parseInt(id)),
                    getDocenteKpiNames(parseInt(id))
                ]);
                console.log("KPI Data:", kpiData);
                console.log("Nombre Data:", nombreData);

                const kpiMap = new Map<number, DocenteKPI>(
                    kpiData.map((kpi: DocenteKPI) => [
                        kpi.id,
                        {
                            ...kpi,
                            cumplimientoDiario: kpi.cumplimientoDiario && kpi.cumplimientoDiario.length > 0
                                ? kpi.cumplimientoDiario
                                : Array(5).fill(false)
                        }
                    ])
                );

                setKPIs(kpiMap);
                setNombres(nombreData);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
    };
  
      fetchData();
    }, [id]);

    const handleCheckboxChange = async (kpiId: number, dayIndex: number) => {
        const kpi = kpis.get(kpiId);
        if (!kpi) return;

        const updatedCumplimiento = [...kpi.cumplimientoDiario];
        updatedCumplimiento[dayIndex] = !updatedCumplimiento[dayIndex];

        // Calcular el total de días cumplidos
        const totalSemanal = updatedCumplimiento.filter(day => day).length;
        const updatedKpi = { ...kpi, cumplimientoDiario: updatedCumplimiento, totalSemanal };
        setKPIs(prevKpis => new Map(prevKpis).set(kpiId, updatedKpi));
        console.log("total semanal:", totalSemanal);

        try {
            await updateDocenteKpi(kpiId, updatedKpi);
            console.log("KPI actualizado exitosamente");
        } catch (error) {
            console.error("Error al actualizar el KPI:", error);
        }
    };

  return (
    <div>
        {nombres.length > 0 && (
        <h2>
          KPI's de {nombres[0].docenteNombre} {nombres[0].docenteApellido}
        </h2>
        )}
      {kpis.size > 0 ? (
        <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
            <tr>
              <th>KPI</th>
              <th>Actual/Target</th>
              <th>Semana</th>
            </tr>
        </thead>
        <tbody>
            {Array.from(kpis.values()).map((kpi) => {
                const kpiNombre = nombres.find(nombre => nombre.docenteKpiId === kpi.id)?.kpiNombre;

                return (
                    <React.Fragment key={`docenteKPI-${kpi.id}`}>
                        <tr key={`actual-${kpi.id}`}>
                            <td rowSpan={3}>{kpiNombre || 'KPI Desconocido'}</td>
                            <td>Actual</td>
                            {kpi.cumplimientoDiario.map((cumplido, index) => (
                                <td key={`${kpi.id}-checkbox-${index}`} style={{ textAlign: 'center' }}>
                                    <label className="container">
                                        {dayOfWeek[index]}
                                        <input
                                            checked={cumplido}
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(kpi.id, index)} />
                                        <div className="checkmark"></div>
                                    </label>
                                </td>
                            ))}
                        </tr>
                        <tr key={`${kpi.id}-objetivo`}>
                            <td>Objetivo cumplido</td>
                            <td colSpan={5} style={{ textAlign: 'center' }}>{kpi.objetivo || 'N/A'}</td>
                        </tr>
                        <tr key={`${kpi.id}-total-semanal`}>
                            <td>Total Semanal</td>
                            <td colSpan={5} style={{ textAlign: 'center' }}>{kpi.totalSemanal || 'N/A'}</td>
                        </tr>
                    </React.Fragment>
                            );
                        })}
            </tbody>
    </table>
) : (
    <p>No hay KPI's disponibles para este docente.</p>
      )}
    </div>
  );
};

export default DocenteKPIView;
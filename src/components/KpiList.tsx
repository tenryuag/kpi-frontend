import React, { useEffect, useState } from 'react';
import { getKPIs, createKPI, deleteKPI } from '../services/api';
import '../styles/style.css';

interface KPI {
  id: number;
  nombre: string;
  descripcion: string;
}

const KPIList: React.FC = () => {
  const [kpis, setKPIs] = useState<KPI[]>([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    const fetchKPIs = async () => {
      const data = await getKPIs();
      setKPIs(data);
    };

    fetchKPIs();
  }, []);

  const handleAddKPI = async () => {
    await createKPI({ nombre, descripcion });
    setNombre('');
    setDescripcion('');
    const data = await getKPIs();
    setKPIs(data);
  };

  const handleDeleteKPI = async (id: number) => {
    await deleteKPI(id);
    const data = await getKPIs();
    setKPIs(data);
  };

  return (
    <div className="docente-info">
      <h2>KPI's Globales</h2>
      <ul>
        <div>
          <input
            type="text"
            placeholder="Nombre del KPI"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="input"
          />
        </div>
          <button onClick={handleAddKPI}>Agregar KPI</button>
      </ul>
      <ul>
        {kpis.map(kpi => (
          <li key={kpi.id}  className="docente-item">
            {kpi.nombre}: {kpi.descripcion}
            <button onClick={() => handleDeleteKPI(kpi.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KPIList;
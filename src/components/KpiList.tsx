import React, { useEffect, useState } from 'react';
import { getKPIs, createKPI, deleteKPI } from '../services/api';

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
    <div>
      <h2>KPI's Globales</h2>
      <input
        type="text"
        placeholder="Nombre del KPI"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button onClick={handleAddKPI}>Agregar KPI</button>
      <ul>
        {kpis.map(kpi => (
          <li key={kpi.id}>
            {kpi.nombre}: {kpi.descripcion}
            <button onClick={() => handleDeleteKPI(kpi.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KPIList;
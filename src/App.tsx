import React from 'react';
import DocenteList from './components/DocenteList';
import KpiList from './components/KpiList';
import DocenteForm from './components/DocenteForm';
import DocenteKPIView from './components/DocenteKPIView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/addDocente" element={<DocenteForm />} />  {/* Página para agregar docentes */}
        <Route path="/" element={<DocenteList />} />  {/* Página principal con la lista de docentes */}
        <Route path="/kpilist" element={<KpiList />} />  {/* Página principal con la lista de KPI's y opcion para agregar mas */}
        <Route path="/docente/:id/kpis" element={<DocenteKPIView />} />  {/* Vista de KPI's del docente */}
      </Routes>
    </Router>
  );
};

export default App;

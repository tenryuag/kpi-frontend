import React from 'react';
import DocenteList from './components/DocenteList';
import KpiList from './components/KpiList';
import DocenteForm from './components/DocenteForm';
import DocenteKPIView from './components/DocenteKPIView';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Menú principal */}
        <nav style={{ padding: '10px', backgroundColor: '#f8f9fa', marginBottom: '20px' }}>
          <Link to="/" style={{ margin: '0 15px' }}>Lista de Docentes</Link>
          <Link to="/addDocente" style={{ margin: '0 15px' }}>Agregar Docente</Link>
          <Link to="/kpilist" style={{ margin: '0 15px' }}>Lista de KPI's</Link>
        </nav>
        
        {/* Rutas de la aplicación */}
        <Routes>
          <Route path="/" element={<DocenteList />} />  {/* Página principal con la lista de docentes */}
          <Route path="/addDocente" element={<DocenteForm />} />  {/* Página para agregar docentes */}
          <Route path="/kpilist" element={<KpiList />} />  {/* Página principal con la lista de KPI's y opción para agregar más */}
          <Route path="/docente/:id/kpis" element={<DocenteKPIView />} />  {/* Vista de KPI's del docente */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import DocenteList from './components/DocenteList';
import KpiList from './components/KpiList';
import DocenteForm from './components/DocenteForm';
import DocenteKPIView from './components/DocenteKPIView';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Menú principal */}
        <nav className="menu-bar">
          <div className="group">
            <Link to="/" className="item">Lista de Docentes</Link>
            <Link to="/addDocente" className="item">Agregar Docente</Link>
            <Link to="/kpilist" className="item">Lista de KPI's</Link>
          </div>
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

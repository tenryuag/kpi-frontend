// Definir el tipo DocenteKPI aquí
export interface DocenteKPI {
    id: number;
    kpiName: { nombre: string };
    valor: number;
    objetivo: number;
    porcentajeActual: number;
    totalSemanal: number;
    totalMensual: number;
    totalTrimestral: number;
    totalAnual: number;
    cumplimientoDiario: boolean[];  // Array de booleanos para marcar cumplimiento diario
  }

export interface Docente {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
}

export interface KPI {
    id: number;
    nombre: string;
}

export interface DocenteKPI {
    id: number;
    docente: Docente;
    kpi: KPI;
    valor: number;
}

export interface DocenteKpiResponse {
    docenteNombre: string;
    docenteApellido: string;
    kpiNombre: string;
    kpiId: number;
    valor: number;
    docenteKpiId: number;
}

import { useState } from 'react'
import './App.css'

function App() {
  const [vista, setVista] = useState('resumen')
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="logo">TaskCampus</h1>
        <p className="subtitle">Organiza tu vida académica</p>

        <nav>
          <button
            className={vista === 'resumen' ? 'nav-button active' : 'nav-button'}
            onClick={() => setVista('resumen')}
          >
            Resumen
          </button>

          <button
            className={vista === 'tareas' ? 'nav-button active' : 'nav-button'}
            onClick={() => setVista('tareas')}
          >
            Tareas
          </button>

          <button
            className={vista === 'nueva' ? 'nav-button active' : 'nav-button'}
            onClick={() => setVista('nueva')}
          >
            Nueva tarea
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">ESPACIO ACADÉMICO</p>
            <h2>
              {vista === 'resumen' && 'Resumen general'}
              {vista === 'tareas' && 'Mis tareas'}
              {vista === 'nueva' && 'Crear una tarea'}
            </h2>
          </div>
          <span className="status-badge">Mi espacio</span>
        </header>

        {vista === 'resumen' && (
          <section className="welcome-card">
            <p className="eyebrow">BIENVENIDO A TASKCAMPUS</p>
            <h3>Todo lo que tienes que hacer, en un solo lugar.</h3>
            <p>
              Organiza tus actividades académicas, revisa tus pendientes
              y lleva un seguimiento de tu progreso.
            </p>
            <button
              className="primary-button"
              onClick={() => setVista('tareas')}
            >
              Ver mis tareas
            </button>
          </section>
        )}

        {vista === 'tareas' && (
          <section className="content-card">
            <h3>Mis tareas</h3>
            <p>En esta sección cargaremos y administraremos las tareas.</p>
          </section>
        )}

        {vista === 'nueva' && (
          <section className="content-card">
            <h3>Nueva tarea</h3>
            <p>Aquí construiremos el formulario para crear tareas.</p>
          </section>
        )}
      </main>
    </div>
  )
}

export default App


import { useState } from 'react'
import { useTareas } from './hooks/useTareas'
import Header from './components/Header'
import TaskList from './components/TaskList'
import TaskSummary from './components/TaskSummary'
import './App.css'

function App() {
  const [vista, setVista] = useState('resumen')

  const {
    tareas,
    setTareas,
    cargando,
    error,
  } = useTareas()

  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="logo">TaskCampus</h1>
        <p className="subtitle">Organiza tu vida académica</p>

        <nav>
          <button
            className={
              vista === 'resumen'
                ? 'nav-button active'
                : 'nav-button'
            }
            onClick={() => setVista('resumen')}
          >
            Resumen
          </button>

          <button
            className={
              vista === 'tareas'
                ? 'nav-button active'
                : 'nav-button'
            }
            onClick={() => setVista('tareas')}
          >
            Tareas
          </button>

          <button
            className={
              vista === 'nueva'
                ? 'nav-button active'
                : 'nav-button'
            }
            onClick={() => setVista('nueva')}
          >
            Nueva tarea
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <Header
          titulo={
            vista === 'resumen'
              ? 'Resumen general'
              : vista === 'tareas'
                ? 'Mis tareas'
                : 'Crear una tarea'
          }
        />

        {vista === 'resumen' && (
          <>
            <section className="welcome-card">
              <p className="eyebrow">BIENVENIDO A TASKCAMPUS</p>

              <h3>
                Todo lo que tienes que hacer, en un solo lugar.
              </h3>

              <p>
                Organiza tus actividades académicas, revisa tus
                pendientes y lleva un seguimiento de tu progreso.
              </p>

              <button
                className="primary-button"
                onClick={() => setVista('tareas')}
              >
                Ver mis tareas
              </button>
            </section>

            {cargando ? (
              <p>Cargando resumen...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : (
              <TaskSummary tareas={tareas} />
            )}
          </>
        )}

        {vista === 'tareas' && (
          <section className="content-card">
            <h3>Mis tareas</h3>

            {cargando && <p>Cargando tareas...</p>}

            {!cargando && error && (
              <p className="error-message">{error}</p>
            )}

            {!cargando && !error && (
              <TaskList tareas={tareas} />
            )}
          </section>
        )}

        {vista === 'nueva' && (
          <section className="content-card">
            <h3>Nueva tarea</h3>
            <p>
              En el siguiente paso construiremos el formulario
              para crear tareas.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}

export default App


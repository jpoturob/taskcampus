
import { useState } from 'react'
import { useTareas } from './hooks/useTareas'
import { crearTarea } from './services/tareasService'
import Header from './components/Header'
import TaskList from './components/TaskList'
import TaskSummary from './components/TaskSummary'
import './App.css'

function App() {
  const [vista, setVista] = useState('resumen')
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [guardando, setGuardando] = useState(false)
  const [errorFormulario, setErrorFormulario] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')

  const {
    tareas,
    setTareas,
    cargando,
    error,
  } = useTareas()

  async function manejarCrearTarea(evento) {
    evento.preventDefault()

    const titulo = nuevoTitulo.trim()

    if (!titulo) {
      setErrorFormulario('Escribe el título de la tarea.')
      setMensajeExito('')
      return
    }

    try {
      setGuardando(true)
      setErrorFormulario('')
      setMensajeExito('')

      const tareaCreada = await crearTarea(titulo)

      setTareas((tareasActuales) => [
        ...tareasActuales,
        tareaCreada,
      ])

      setNuevoTitulo('')
      setMensajeExito('¡Tarea creada correctamente!')
    } catch (err) {
      console.error('Error al crear tarea:', err)
      setErrorFormulario(
        'No se pudo crear la tarea. Intenta nuevamente.'
      )
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="logo">TaskCampus</h1>
        <p className="subtitle">
          Organiza tu vida académica
        </p>

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
              <p className="eyebrow">
                BIENVENIDO A TASKCAMPUS
              </p>

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
              <TaskList
                tareas={tareas}
                setTareas={setTareas}
              />
            )}
          </section>
        )}

        {vista === 'nueva' && (
          <section className="content-card">
            <h3>Nueva tarea</h3>
            <p>
              Ingresa el título de tu nueva tarea académica.
            </p>

            <form
              onSubmit={manejarCrearTarea}
              className="task-form"
            >
              <label htmlFor="tituloTarea">
                Título de la tarea
              </label>

              <input
                id="tituloTarea"
                type="text"
                value={nuevoTitulo}
                onChange={(evento) =>
                  setNuevoTitulo(evento.target.value)
                }
                placeholder="Ej. Estudiar para la prueba"
                maxLength={120}
                disabled={guardando}
              />

              {errorFormulario && (
                <p className="error-message">
                  {errorFormulario}
                </p>
              )}

              {mensajeExito && (
                <p className="success-message">
                  {mensajeExito}
                </p>
              )}

              <button
                type="submit"
                className="primary-button"
                disabled={guardando}
              >
                {guardando ? 'Guardando...' : 'Crear tarea'}
              </button>
            </form>
          </section>
        )}
      </main>
    </div>
  )
}

export default App


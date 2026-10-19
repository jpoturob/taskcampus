import { useState } from 'react'
import {
  actualizarTarea,
  eliminarTarea,
} from '../services/tareasService'

function TaskList({ tareas, setTareas }) {
  const [editandoId, setEditandoId] = useState(null)
  const [tituloEditado, setTituloEditado] = useState('')
  const [guardandoId, setGuardandoId] = useState(null)
  const [eliminandoId, setEliminandoId] = useState(null)
  const [cambiandoEstadoId, setCambiandoEstadoId] = useState(null)
  const [filtro, setFiltro] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [error, setError] = useState('')

  const tareasFiltradas = tareas.filter((tarea) => {
    const coincideBusqueda = tarea.titulo
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase())

    const coincideFiltro =
      filtro === 'todas' ||
      (filtro === 'pendientes' && !tarea.completada) ||
      (filtro === 'completadas' && tarea.completada)

    return coincideBusqueda && coincideFiltro
  })

  function iniciarEdicion(tarea) {
    setEditandoId(tarea.id)
    setTituloEditado(tarea.titulo)
    setError('')
  }

  function cancelarEdicion() {
    setEditandoId(null)
    setTituloEditado('')
    setError('')
  }

  async function guardarEdicion(tarea) {
    const titulo = tituloEditado.trim()

    if (!titulo) {
      setError('El título no puede estar vacío.')
      return
    }

    if (titulo === tarea.titulo) {
      cancelarEdicion()
      return
    }

    try {
      setGuardandoId(tarea.id)
      setError('')

      await actualizarTarea(tarea.id, { titulo })

      setTareas((actuales) =>
        actuales.map((actual) =>
          actual.id === tarea.id ? { ...actual, titulo } : actual
        )
      )

      cancelarEdicion()
    } catch (err) {
      console.error('Error al editar tarea:', err)
      setError('No se pudo guardar el cambio.')
    } finally {
      setGuardandoId(null)
    }
  }

  async function manejarEstado(tarea) {
    try {
      setCambiandoEstadoId(tarea.id)
      setError('')

      const nuevoEstado = !tarea.completada

      await actualizarTarea(tarea.id, {
        completada: nuevoEstado,
      })

      setTareas((actuales) =>
        actuales.map((actual) =>
          actual.id === tarea.id
            ? { ...actual, completada: nuevoEstado }
            : actual
        )
      )
    } catch (err) {
      console.error('Error al cambiar estado:', err)
      setError('No se pudo cambiar el estado de la tarea.')
    } finally {
      setCambiandoEstadoId(null)
    }
  }

  async function manejarEliminar(tarea) {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar la tarea "${tarea.titulo}"?`
    )

    if (!confirmar) return

    try {
      setEliminandoId(tarea.id)
      setError('')

      await eliminarTarea(tarea.id)

      setTareas((actuales) =>
        actuales.filter((actual) => actual.id !== tarea.id)
      )
    } catch (err) {
      console.error('Error al eliminar tarea:', err)
      setError('No se pudo eliminar la tarea. Intenta nuevamente.')
    } finally {
      setEliminandoId(null)
    }
  }

  return (
    <div className="task-list">
      <div className="task-toolbar">
        <input
          type="search"
          className="task-search"
          placeholder="Buscar tarea por título..."
          value={busqueda}
          onChange={(evento) => setBusqueda(evento.target.value)}
          aria-label="Buscar tareas por título"
        />

        <div className="task-filters">
          <button
            type="button"
            className={filtro === 'todas' ? 'filter-button active' : 'filter-button'}
            onClick={() => setFiltro('todas')}
          >
            Todas
          </button>

          <button
            type="button"
            className={filtro === 'pendientes' ? 'filter-button active' : 'filter-button'}
            onClick={() => setFiltro('pendientes')}
          >
            Pendientes
          </button>

          <button
            type="button"
            className={filtro === 'completadas' ? 'filter-button active' : 'filter-button'}
            onClick={() => setFiltro('completadas')}
          >
            Completadas
          </button>
        </div>
      </div>

      {tareasFiltradas.length === 0 ? (
        <p>
          {tareas.length === 0
            ? 'No hay tareas para mostrar.'
            : 'No se encontraron tareas con esos criterios.'}
        </p>
      ) : (
        tareasFiltradas.map((tarea) => (
          <article className="task-item" key={tarea.id}>
            <div className="task-details">
              {editandoId === tarea.id ? (
                <input
                  autoFocus
                  value={tituloEditado}
                  maxLength={120}
                  disabled={guardandoId === tarea.id}
                  onChange={(evento) =>
                    setTituloEditado(evento.target.value)
                  }
                  onKeyDown={(evento) => {
                    if (evento.key === 'Enter') guardarEdicion(tarea)
                    if (evento.key === 'Escape') cancelarEdicion()
                  }}
                  aria-label="Editar título de tarea"
                />
              ) : (
                <h4
                  className="editable-title"
                  title="Haz doble clic para editar"
                  onDoubleClick={() => iniciarEdicion(tarea)}
                >
                  {tarea.titulo}
                </h4>
              )}

              <span
                className={
                  tarea.completada
                    ? 'task-status completed'
                    : 'task-status pending'
                }
              >
                {tarea.completada ? 'Completada' : 'Pendiente'}
              </span>

              <div className="edit-actions">
                {editandoId === tarea.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => guardarEdicion(tarea)}
                      disabled={guardandoId === tarea.id}
                    >
                      {guardandoId === tarea.id ? 'Guardando...' : 'Guardar'}
                    </button>

                    <button
                      type="button"
                      onClick={cancelarEdicion}
                      disabled={guardandoId === tarea.id}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => manejarEstado(tarea)}
                    disabled={
                      cambiandoEstadoId === tarea.id ||
                      eliminandoId === tarea.id
                    }
                  >
                    {cambiandoEstadoId === tarea.id
                      ? 'Actualizando...'
                      : tarea.completada
                        ? 'Marcar pendiente'
                        : 'Completar tarea'}
                  </button>
                )}
              </div>
            </div>

            <button
              type="button"
              className="delete-button"
              onClick={() => manejarEliminar(tarea)}
              disabled={
                eliminandoId === tarea.id ||
                guardandoId === tarea.id ||
                cambiandoEstadoId === tarea.id
              }
            >
              {eliminandoId === tarea.id ? 'Eliminando...' : 'Eliminar'}
            </button>
          </article>
        ))
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default TaskList
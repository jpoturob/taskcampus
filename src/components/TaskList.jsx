
import { useState } from 'react'
import { actualizarTarea } from '../services/tareasService'

function TaskList({ tareas, setTareas }) {
  const [editandoId, setEditandoId] = useState(null)
  const [tituloEditado, setTituloEditado] = useState('')
  const [guardandoId, setGuardandoId] = useState(null)
  const [error, setError] = useState('')

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

      const tareaActualizada = await actualizarTarea(
        tarea.id,
        { titulo }
      )

      setTareas((tareasActuales) =>
        tareasActuales.map((actual) =>
          actual.id === tarea.id
            ? { ...actual, titulo: tareaActualizada.titulo }
            : actual
        )
      )

      cancelarEdicion()
    } catch (err) {
      console.error('Error al editar tarea:', err)
      setError('No se pudo guardar el cambio. Intenta nuevamente.')
    } finally {
      setGuardandoId(null)
    }
  }

  if (tareas.length === 0) {
    return <p>No hay tareas para mostrar.</p>
  }

  return (
    <div className="task-list">
      {tareas.map((tarea) => (
        <article className="task-item" key={tarea.id}>
          <div>
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
                  if (evento.key === 'Enter') {
                    guardarEdicion(tarea)
                  }

                  if (evento.key === 'Escape') {
                    cancelarEdicion()
                  }
                }}
                onBlur={() => {
                  if (guardandoId === null) {
                    // La edición se guarda con Enter.
                  }
                }}
                aria-label="Editar título de tarea"
              />
            ) : (
              <h4
                onDoubleClick={() => iniciarEdicion(tarea)}
                title="Haz doble clic para editar"
                className="editable-title"
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

            {editandoId === tarea.id && (
              <div className="edit-actions">
                <button
                  type="button"
                  onClick={() => guardarEdicion(tarea)}
                  disabled={guardandoId === tarea.id}
                >
                  {guardandoId === tarea.id
                    ? 'Guardando...'
                    : 'Guardar'}
                </button>

                <button
                  type="button"
                  onClick={cancelarEdicion}
                  disabled={guardandoId === tarea.id}
                >
                  Cancelar
                </button>
              </div>
            )}

            {editandoId === tarea.id && error && (
              <p className="error-message">{error}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

export default TaskList



function TaskList({ tareas }) {
  if (tareas.length === 0) {
    return <p>No hay tareas para mostrar.</p>
  }

  return (
    <div className="task-list">
      {tareas.map((tarea) => (
        <article className="task-item" key={tarea.id}>
          <div>
            <h4>{tarea.titulo}</h4>

            <span
              className={
                tarea.completada
                  ? 'task-status completed'
                  : 'task-status pending'
              }
            >
              {tarea.completada ? 'Completada' : 'Pendiente'}
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}

export default TaskList

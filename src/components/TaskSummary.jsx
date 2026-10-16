
function TaskSummary({ tareas }) {
  const total = tareas.length

  const completadas = tareas.filter(
    (tarea) => tarea.completada
  ).length

  const pendientes = total - completadas

  return (
    <section className="summary-grid">
      <article className="summary-card">
        <p>Total de tareas</p>
        <h3>{total}</h3>
      </article>

      <article className="summary-card">
        <p>Pendientes</p>
        <h3>{pendientes}</h3>
      </article>

      <article className="summary-card">
        <p>Completadas</p>
        <h3>{completadas}</h3>
      </article>
    </section>
  )
}

export default TaskSummary

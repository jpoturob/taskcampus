
const API_URL = 'https://jsonplaceholder.typicode.com/todos'

// Obtener las primeras 10 tareas
export async function obtenerTareas() {
  const respuesta = await fetch(`${API_URL}?_limit=10`)

  if (!respuesta.ok) {
    throw new Error('No se pudieron cargar las tareas.')
  }

  const datos = await respuesta.json()

  return datos.map((tarea) => ({
    id: tarea.id,
    titulo: tarea.title,
    completada: tarea.completed,
  }))
}

// Crear una tarea
export async function crearTarea(titulo) {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: titulo,
      completed: false,
      userId: 1,
    }),
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo crear la tarea.')
  }

  const tarea = await respuesta.json()

  return {
    id: tarea.id,
    titulo: tarea.title,
    completada: tarea.completed,
  }
}

// Actualizar el título o el estado
export async function actualizarTarea(id, cambios) {
  const cuerpo = {}

  if (cambios.titulo !== undefined) {
    cuerpo.title = cambios.titulo
  }

  if (cambios.completada !== undefined) {
    cuerpo.completed = cambios.completada
  }

  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo actualizar la tarea.')
  }

  const tarea = await respuesta.json()

  return {
    id: tarea.id,
    titulo: tarea.title,
    completada: tarea.completed,
  }
}

// Eliminar una tarea
export async function eliminarTarea(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!respuesta.ok) {
    throw new Error('No se pudo eliminar la tarea.')
  }

  return true
}

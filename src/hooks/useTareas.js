
import { useState, useEffect } from 'react'

const API_URL = 'https://jsonplaceholder.typicode.com/todos'

export function useTareas() {
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const cargarTareas = async () => {
      try {
        setCargando(true)
        setError('')

        const respuesta = await fetch(`${API_URL}?_limit=10`)

        if (!respuesta.ok) {
          throw new Error('Error al cargar las tareas')
        }

        const datos = await respuesta.json()

        const tareasAdaptadas = datos.map((tarea) => ({
          id: tarea.id,
          titulo: tarea.title,
          completada: tarea.completed,
        }))

        setTareas(tareasAdaptadas)
      } catch (err) {
        setError('No fue posible cargar las tareas. Intenta nuevamente.')
      } finally {
        setCargando(false)
      }
    }

    cargarTareas()
  }, [])

  return { tareas, setTareas, cargando, error }
}

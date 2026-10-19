
import { useState, useEffect } from 'react'
import { obtenerTareas } from '../services/tareasService'

export function useTareas() {
  const [tareas, setTareas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarTareas() {
      try {
        setCargando(true)
        setError('')

        const datos = await obtenerTareas()
        setTareas(datos)
      } catch (err) {
        console.error('Error al cargar tareas:', err)
        setError('No fue posible cargar las tareas. Intenta nuevamente.')
      } finally {
        setCargando(false)
      }
    }

    cargarTareas()
  }, [])

  return { tareas, setTareas, cargando, error }
}


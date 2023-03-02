import { useState } from "react"
import { getGuitarra } from "~/models/guitarras.server"
import { useLoaderData, useOutletContext } from '@remix-run/react'

export async function loader({request, params}) {
  const { guitarraUrl } = params  
  const guitarra = await getGuitarra(guitarraUrl)

  if(guitarra.data.length === 0){
    throw new Response('', {
      status: 404,
      statusText: "Guitarra no encontrada "
    })
  }

  return guitarra 
}

export function meta({data}) {

  if(!data){
    return {
      title: 'GuitarLA - Guitarra no encontrada',
      description: `Guitarras, Venta de Guitarras, guitarra no encontrada`
    }
  }
  
  return {
      title: `GuitarLA - ${data.data[0].attributes.nombre}`,
      description: `Guitarras, Venta de Guitarras, guitarra ${data.data[0].attributes.nombre}`
  }
}

function Guitarra() {

  const { agregarCarrito } = useOutletContext()

  const [cantidad, setCantidad] = useState(0)

  const guitarra = useLoaderData() 
  const { nombre, precio, imagen, descripcion } = guitarra.data[0].attributes

  

  const handleSubmit = (e) => {
    e.preventDefault()

    if(cantidad < 1) {
      alert('Debes seleccionar una cantidad')
      return
    }

    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data[0].attributes.url,
      nombre,
      precio,
      cantidad
    }
    
    agregarCarrito(guitarraSeleccionada)    

  }



  return (
    <div className="guitarra">
      <img className="imagen" src={imagen.data[0].attributes.url} alt={`Imagen de la guitarra ${nombre}`}/>
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
        <form 
          className="formulario"
          onSubmit={handleSubmit}
        >
          <label htmlFor="cantidad">Cantidad</label>
          <select 
            // el signo + reemplaza al parseInt para convertir un string a un numero
            onChange={ e => setCantidad(+e.target.value)}
            id="cantidad"

          >
            <option value="0">-- Seleccione --</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input 
            type="submit" 
            value="Añadir al carrito" 
          />
        </form>
      </div>

    </div>
  )
}

export default Guitarra
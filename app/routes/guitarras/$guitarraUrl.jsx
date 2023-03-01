import { getGuitarra } from "~/models/guitarras.server"
import { useLoaderData } from '@remix-run/react'

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

  const guitarra = useLoaderData() 

  const { nombre, precio, imagen, descripcion } = guitarra.data[0].attributes

  return (
    <div className="guitarra">
      <img className="imagen" src={imagen.data[0].attributes.url} alt={`Imagen de la guitarra ${nombre}`}/>
      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
      </div>
      
    </div>
  )
}

export default Guitarra
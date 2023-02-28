import { getPost } from '~/models/posts.server'
import { useLoaderData } from '@remix-run/react'
import { formatearFecha } from '~/utils/helpers'
import styles from '~/styles/blog.css'


export function links(){
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export function meta({data}) {

    console.log(data)

    if(!data){
    return {
        title: 'GuitarLA - Entrada no encontrada',
        description: `Guitarras, Venta de Guitarras, entrada no encontrada`
    }
    }
    
    return {
        title: `GuitarLA - ${data.titulo}`,
        description: `Guitarras, Venta de Guitarras, blog de guitarra, entrada ${data.titulo}`
    }
}


export async function loader({params}){
    const { postUrl } = params
    const post = await getPost(postUrl)

    if(post.data.length === 0){
        throw new Response('', {
            status: 404,
            statusText: 'Entrada no encontrada'
        })
    }

    return post.data[0].attributes
}


function Post() {

    const post = useLoaderData()    
    const { titulo, imagen, contenido, publishedAt } = post

    return (
        <article className='contenedor post mt-3'>
            <img className="imagen" src={imagen?.data?.attributes?.url} alt={`imagen blog ${titulo}`} />
            <div className="contenido">
                <h3 className="">{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="texto">{contenido}</p>
            </div>
        </article>
    )
}

export default Post
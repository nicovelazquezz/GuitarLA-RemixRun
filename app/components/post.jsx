import { Link } from "@remix-run/react"
import { formatearFecha } from '~/utils/helpers'

function Post({post}) {

    const { titulo, contenido, url, imagen, publishedAt } = post
    
    return (
        <article className="post">
            <img className="imagen" src={imagen.data.attributes.formats.small.url} alt={`imagen blog ${titulo}`} />
            <div className="contenido">
                <h3 className="">{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="resumen">{contenido}</p>
                <Link className="enlace" to={`/post/${url}`}> Leer Post </Link>
            </div>
        </article>
    )
}

export default Post
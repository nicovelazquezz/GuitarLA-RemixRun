import { useLoaderData } from '@remix-run/react'
import { getGuitarras } from '~/models/guitarras.server'
import Guitarra from '~/components/guitarra'
import styles from '~/styles/guitarras.css'

export function meta() {
    return {
        title: 'GuitarLA - Tienda de Guitarras',
        description: 'GuitarLA - Nuestra Colección de Guitarras'
    }
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export async function loader() {
    const guitarras = await getGuitarras()
    return guitarras.data
}

function Tienda() {

    const guitarras = useLoaderData()

    return (
        <main className='contenedor'>
            <h2 className='heading'> Nuestra Coleccion</h2>

            {/* optional chaining "?" para evitar posibles errores */}
            { guitarras?.length && (
                <div className="guitarras-grid">
                    { guitarras.map ( guitarra => (
                            <Guitarra 
                                guitarra={guitarra?.attributes}
                                key={guitarra?.id}                            
                            />
                        ))}
                </div>
            )}

        </main>
    )
}

export default Tienda
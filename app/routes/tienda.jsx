import styles from '~/styles/guitarras.css'
import ListadoGuitarras from '~/components/listadoGuitarras'
import { getGuitarras } from '~/models/guitarras.server'
import { useLoaderData } from 'react-router'

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

export async function loader(){
    const guitarras = await getGuitarras()
    return guitarras.data
}



function Tienda() {

    const guitarras = useLoaderData()

    return (
        <main className='contenedor'>
            <ListadoGuitarras 
                guitarras={guitarras}
            />
        </main>
    )
}

export default Tienda
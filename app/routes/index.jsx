import { getGuitarras } from '~/models/guitarras.server'
import { getPosts } from '~/models/posts.server'
import { getCurso } from '~/models/curso.server'
import { useLoaderData } from '@remix-run/react'
import ListadoGuitarras from '~/components/listadoGuitarras'
import ListadoPosts from '~/components/listadoPosts'
import Curso from '~/components/curso'
import stylesGuitarras from '~/styles/guitarras.css'
import stylesPost from '~/styles/blog.css'
import stylesCurso from '~/styles/curso.css'


export function links(){
    return [
        {
            rel: 'stylesheet',
            href: stylesGuitarras
        },
        {
            rel: 'stylesheet',
            href: stylesPost
        },
        {
            rel: 'stylesheet',
            href: stylesCurso
        }
    ]
} 

export function meta(){
    
}


export async function loader() {
    const [guitarras, posts, curso] = await Promise.all([
        getGuitarras(),
        getPosts(),
        getCurso()
    ])

    return {
        guitarras: guitarras.data,
        posts: posts.data,
        curso: curso.data.attributes
    }
}


function Index() {    

    const {guitarras, posts, curso} = useLoaderData()
 

    return (
        <>
            <main className='contenedor'>
                <ListadoGuitarras 
                    guitarras={guitarras}
                />
            </main>
            <Curso
                curso={curso}
            />
            <section className='contenedor'> 
                <ListadoPosts 
                    posts={posts}
                />        
            </section>        
        </>
    )
}

export default Index
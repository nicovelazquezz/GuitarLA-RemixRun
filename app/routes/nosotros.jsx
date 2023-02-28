import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'
export function meta() {
    return (
        {
            title: 'GuitarLA - Sobre Nosotros',
            description: 'Venta de guitarras, blog de música, tienda'
        }
    )
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        },
        // La imagen puede ser pesada entonce tan pronto cargue el html, cargue la imagen
        {
            rel: 'preload',
            href: imagen,
            as: 'imagen'
        }
    ]
}

function Nosotros() {
    return (
        <main className="contenedor nosotros">
            <h2 className="heading">Nosotros</h2>
            <div className="contenido">
                <img src={imagen} alt='imagen nosotros' />
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, facilis commodi odio possimus nam ex. Aspernatur minima odit consequatur cum est expedita nesciunt veritatis, fugiat praesentium? Earum accusantium laboriosam eius!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, facilis commodi odio possimus nam ex. Aspernatur minima odit consequatur cum est expedita nesciunt veritatis, fugiat praesentium? Earum accusantium laboriosam eius!
                    </p>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, facilis commodi odio possimus nam ex. Aspernatur minima odit consequatur cum est expedita nesciunt veritatis, fugiat praesentium? Earum accusantium laboriosam eius!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, facilis commodi odio possimus nam ex. Aspernatur minima odit consequatur cum est expedita nesciunt veritatis, fugiat praesentium? Earum accusantium laboriosam eius!
                    </p>
                </div>
            </div>

        </main>
    )
}

export default Nosotros
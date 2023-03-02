import { useState, useEffect } from 'react'
// importar el componente para renderizar la funcion meta dentro del head
import { 
    Meta, 
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useCatch,
    Link
} from '@remix-run/react'
import styles from '~/styles/index.css'
import Header from '~/components/header'
import Footer from '~/components/footer'

// Funcion para importar etiquetas meta, se inyecta automaticamente en el head
export function meta() {
    return (
        {
            charset: 'utf-8',
            title: 'GuitarLA - Remix',
            viewport: 'width=device-width,initial-scale=1'
        }
    )
}
// Funcion para importar hojas de estilo
export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: "true"
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]    
}

export default function App(){

    // esto de entrada da NULL entonces seteamos que si no hay nada sea un arreglo vacío
    // la parte de remix que se ejecuta en el servidor no tiene la parte de window, le estamos diciendo que si el codigo es del servidor entonces no haga nada(null) pero si es del navegador agrega localstorage
    const cartLS = typeof window !== 'undefined' ?  JSON.parse(localStorage.getItem('cart')) ?? [] : null
    const [cart, setCart] = useState(cartLS)

    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])
    
    
    // Guitarra state es la guitarra que va a estar en memoria seteada por la funcion agregarCarrito
    const agregarCarrito = guitarra => {
        if(cart.some(guitarraState => guitarraState.id === guitarra.id)) {
            // Iterar sobre el cart y encontrar el elemento duplicado. .some devuelve un booleano
            const carritoActualizado = cart.map( guitarraState => {
                if(guitarraState.id === guitarra.id) {
                    // Reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState
            })
            // Añadir al carrito y reescribirlo totalmente
            setCart(carritoActualizado)
        } else {
            // Si no existe, es un registro nuevo entonces..
            setCart([...cart, guitarra])     
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = cart.map(guitarraState => {
            if(guitarraState.id === guitarra.id) {
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCart(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = cart.filter( guitarraState => guitarraState.id !== id)
        setCart(carritoActualizado)
    }

    return (
            <Document>
                <Outlet 
                    context={{
                        agregarCarrito,
                        cart,
                        actualizarCantidad,
                        eliminarGuitarra
                    }}
                />
            </Document>
    )
}


function Document({children}) {
    return (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                
                {/* Scripts de optimización de Remix Run y LiveReload como liveserver*/}
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

// Manejo de Errores

export function CatchBoundary() {
    const error = useCatch()
    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='error-enlace' to="/">Tal vez quieras volver a la página principal</Link>
        </Document>
    )
}

export function ErrorBoundary({error}) {
    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='error-enlace' to="/">Tal vez quieras volver a la página principal</Link>
        </Document>
    )
}
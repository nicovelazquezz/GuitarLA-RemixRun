import { useState, useEffect } from 'react'
import { useOutletContext } from '@remix-run/react'
import styles from '~/styles/carrito.css'

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export function meta() {
    return {
        title: 'GuitarLA - Carrito de Compras',
        description: 'Venta de guitarras, música, blog, carrito de compras, tienda'
    }
}


function Carrito() {
    
    const { cart, actualizarCantidad, eliminarGuitarra } = useOutletContext()
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const calculoTotal = cart.reduce((total, product) => total + (product.cantidad * product.precio), 0)
        setTotal(calculoTotal)
    }, [cart])
    
    


    return (
        <main className="contendor">
            <h1 className="heading">Carrito de Compras</h1>
            <div className="contenido">
                <div className="carrito">
                    <h2>Articulos</h2>
                    { cart.length === 0 ? "Carrito Vacío" : (
                        cart.map( product => (
                            <div key={product.id} className="producto">
                                <div>
                                    <img src={product.imagen} alt={`Imagen del producto ${product.nombre}`} />
                                </div>
                                <div>
                                    <p className="nombre">{product.nombre}</p>
                                    <p>Cantidad: </p>
                                    
                                    <select 
                                        value={product.cantidad}
                                        className="select"
                                        onChange={ e=> actualizarCantidad({
                                            cantidad: +e.target.value,
                                            id: product.id
                                        })}
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>

                                    <p className="precio">$<span>{product.precio}</span></p>
                                    <p className="subtotal  ">Subtotal: $<span>{product.cantidad * product.precio}</span></p>
                                </div>
                                <button
                                    type='button'
                                    className='btn_Eliminar'
                                    onClick={ () => eliminarGuitarra(product.id)}
                                >
                                    X
                                </button>  
                            </div>
                        ))
                    )} 
                </div>
                <aside className="resumen">
                    <h3>Resumen del pedido</h3>
                    <p>Total a pagar: ${total}</p>
                </aside>
            </div>
        </main>
    )
}

export default Carrito
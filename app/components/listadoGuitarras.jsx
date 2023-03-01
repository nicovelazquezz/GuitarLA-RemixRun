import Guitarra from "./guitarra"


function ListadoGuitarras({guitarras}) {

    return (
        <>
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
        </>
    )
}

export default ListadoGuitarras
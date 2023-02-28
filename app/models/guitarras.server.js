// al agregar .server le estamos diciendo que este archivo solamente debe de ejecutarse en le parte de servidor de remix
// con el ?populate=imagen traemos la imagen

export async function getGuitarras(){
        // pasar la api como variable de entorno
        const respuesta = await fetch(`${process.env.API_URL}/guitarras?populate=imagen`)
        return await respuesta.json()        
}

// pasamos por parametro la url para inyectarla en la busqueda de la api

export async function getGuitarra(url) {
        const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
        return await respuesta.json()
}
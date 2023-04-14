export default function validarNuevoProducto(valores){
    let errores = {};

    if(!valores.nombre){
        errores.nombre = "El Nombre es Obligatorio";
    }

    if(!valores.empresa){
        errores.empresa = "La Empresa en Obligatoria";
    }

    if(!valores.imagen){
        errores.imagen = "La Imagen es Obligatoria";
    }

    if(!valores.url){
        errores.url = "La URL es Obligatoria";
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)){
        errores.url = "La URL no es válida";
    }

    if(!valores.descripcion){
        errores.descripcion = "La Descripción es Obligatoria";
    }

    return errores;
}

import React, { useContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import Layout from '../components/layout/Layout'
import { css } from '@emotion/react';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import useValidacion from '../hooks/useValidacion';
import validarNuevoProducto from '../validacion/validarNuevoProducto';
import {FirebaseContext} from '../firebase';
import { translate } from 'traduction';
import Router, {useRouter} from 'next/router';
import { addDoc, collection } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import Link from 'next/link';

const STATE_INICIAR = {
    nombre: '',
    empresa: '',
    imagen: '',
    url: '',
    descripcion: ''
};

const NuevoProducto = () => {

    const {valores,errores,handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAR,validarNuevoProducto,crearProducto)
    const {nombre, empresa, imagen,url, descripcion} = valores;

    const { auth, firebase } = useContext(FirebaseContext);
    const router = useRouter();
    
    const [uploading, setUploading] = useState(false);
    const [URLImage, setURLImage] = useState('');


    //validar que el usuario este auth
    
    
    async function crearProducto(){
        if(!auth){
            return router.push('/login');
        }

        

        //crear el objeto de producto

        const producto = {
            nombre,
            empresa,
            url,
            URLImage,
            descripcion,
            votos: 0,
            comentarios: [],
            creado: Date.now(),
            creador: {
                id: auth.uid,
                nombre: auth.displayName
            }
        };

        //Incertar en la BD
        try {
            await addDoc(collection(firebase.db,"productos"),producto);
            router.push('/');
            Swal.fire({
                title: 'Exito',
                text: 'El producto se guardó correctamente',
                icon: 'success'
            });
            
        } catch (error) {
            console.error('Hubo un error al crear el producto', error.message);
            //Comienzo a formatear el mensaje recibido de firebase para que se pueda ver mejor
            let errorM = error.message;
            errorM = errorM.replaceAll(' ','');
            let errorMsg = errorM.substring(9).split('/')[1];
            let mensaje = errorMsg.substr(0,(errorMsg.length - 2));
            
            const msg = await translate(mensaje.toUpperCase(),'en','es');
            Swal.fire({
                title: 'Error',
                text: msg,
                icon: 'error',
                timer: 2500
            });
        }
    }


    const handleImageUpload = e => {
        handleChange(e);
        // Se obtiene referencia de la ubicación donde se guardará la imagen
        const file = e.target.files[0];
        const imageRef = ref(firebase.storage, 'productos/' + file.name);
 
        // Se inicia la subida
        setUploading(true);
        const uploadTask = uploadBytesResumable(imageRef, file);
 
        // Registra eventos para cuando detecte un cambio en el estado de la subida
        uploadTask.on('state_changed', 
            // Muestra progreso de la subida
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Subiendo imagen: ${progress}% terminado`);
            },
            // En caso de error
            error => {
                setUploading(false);
                console.error(error);
            },
            // Subida finalizada correctamente
            () => {
                setUploading(false);
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    //console.log('Imagen disponible en:', url);
                    setURLImage(url);
                });
            }
        );
    };

    return (
        <Layout
            titulo={'Crear Producto'}
        >
            {!auth ? (
                <div 
                    css={css`
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    `}
                >
                    <h2
                        css={css`
                            text-align: center;
                            font-size: 3rem;
                            font-weight: bold;
                            text-transform: uppercase;
                            margin-top: 5rem;
                        `}
                    >No tienes permisos para acceder a esta página</h2>
                    <p css={css`
                        text-align: center;
                    `}>Debes primero Iniciar Sesión</p>
                    <Link href={'/'}>Inicio</Link>
                </div>
            ) : (
                <>
                    <h1
                        css={css`
                            text-align: center;
                            margin-top: 5rem;
                        `}
                    >Nuevo Producto</h1>

                    <Formulario
                        onSubmit={handleSubmit}
                        noValidate
                        css={css`
                            margin-bottom: 5rem;
                        `}
                    >
                        <fieldset>
                            <legend>Información General</legend>
                            <Campo>
                                <label htmlFor="nombre">Nombre</label>
                                <input 
                                    type="text" 
                                    id='nombre'
                                    placeholder='Nombre del Producto'
                                    name='nombre'
                                    value={nombre}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </Campo>

                            {errores?.nombre && <Error>{errores?.nombre}</Error>}

                            <Campo>
                                <label htmlFor="empresa">Empresa</label>
                                <input 
                                    type="text" 
                                    id='empresa'
                                    placeholder='Nombre de la Empresa o Compañia'
                                    name='empresa'
                                    value={empresa}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </Campo>

                            {errores?.empresa && <Error>{errores?.empresa}</Error>}

                            
                            <Campo>
                                <label htmlFor="imagen">Imagen</label>
                                <input 
                                    type="file" 
                                    id='imagen'
                                    name='imagen'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    css={css`
                                        display: flex;
                                        flex-direction: column;
                                        font-size: 1.2rem;

                                        @media (min-width: 768px) {
                                            font-size: 1.5rem;
                                        }
                                    `}
                                />

                            </Campo>

                            {errores?.imagen && <Error>{errores?.imagen}</Error>}

                            <Campo>
                                <label htmlFor="url">Url</label>
                                <input 
                                    type="url" 
                                    id='url'
                                    name='url'
                                    placeholder='URL del Producto'
                                    value={url}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </Campo>

                            {errores?.url && <Error>{errores?.url}</Error>}
                        </fieldset>
                        
                        <fieldset>
                            <legend>Sobre tu Producto</legend>
                            <Campo>
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea
                                    id='descripcion'
                                    rows={3}
                                    name='descripcion'
                                    placeholder='Descripción del Producto'
                                    value={descripcion}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </Campo>

                            {errores?.descripcion && <Error>{errores?.descripcion}</Error>}
                        </fieldset>
                        

                        <InputSubmit 
                            type="submit" 
                            value="Crear Producto" 
                        />
                    </Formulario>
                </>
            )}
        </Layout>
    )
}

export default NuevoProducto

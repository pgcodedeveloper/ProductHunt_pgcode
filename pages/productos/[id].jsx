import Layout from '../../components/layout/Layout';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { FirebaseContext } from '../../firebase';
import Link from 'next/link';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Image from 'next/image';
import {Campo, InputSubmit} from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

const ContProducto = styled.div`
    @media (min-width: 768px) {
        display: grid;
        grid-template-columns: 2fr 1fr;
        column-gap: 2rem;
    }
`;

const ContImagen = styled.div`
    max-width: 100%;
    height: 400px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 2rem;
    transition: all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    @media (min-width: 768px) {
        filter: blur(1px);
        height: 500px;
    }
    :hover{
        scale: 1.05;
        filter: blur(0);
        cursor: zoom-in;
    }
`;
const Producto = () => {
    //Obtengo el id del producto
    const router = useRouter();
    const { id } = router.query;

    const [producto, setProducto] = useState({});
    const [cargando, setCargando] = useState(true);
    const { firebase, auth } = useContext(FirebaseContext);
    
    //Obtener el producto por su id
    useEffect(() =>{
        if(id){
            const obtenerProducto = async () =>{
                
                
                const producto = await getDoc(doc(collection(firebase.db,"productos",),id));
                
                if(producto.exists()){
                    setProducto(producto.data());
                }
                else{
                    Swal.fire({
                        title: 'Error 404',
                        text: 'Producto no encontrado',
                        icon: 'error',
                        timer: 2500
                    });
                    router.push('/');
                }
                setCargando(false);
            }
            obtenerProducto();
           
        }
    },[id]);

    const { nombre,descripcion, empresa, url, comentarios, votos,URLImage, creado,creador } = producto;

    const votarProducto =  async () =>{
        if(!auth){
            return router.push('/login');
        }

        const nuevoTotal = votos + 1;

        //Act la BD
        const docRef = doc(firebase.db, "productos", `${id}`);
 
        updateDoc(docRef, {
            votos: increment(nuevoTotal), 
        
        });

        //Act el State
        setProducto({
            ...producto,
            votos: nuevoTotal
        });
    }
    return (
        <Layout
            titulo={`Producto`}
        >
            {cargando ? <p>Cargando ...</p> : (
                <>
                    <div className='contenedor'>
                        <h1
                            css={css`
                                text-align: center;
                                margin-top: 5rem;
                                font-size: 4rem;
                                margin-bottom: 5rem;
                                text-transform: uppercase;
                                text-shadow: 5px 5px 10px #141313;
                            `}
                        >{nombre}</h1>

                        <ContProducto>
                            <div>

                                <div css={css`
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: center;
                                    align-items: center;
                                    @media (min-width: 768px) {
                                        flex-direction: row;
                                        justify-content: space-between;
                                        align-items: center;
                                    }
                                `}
                                >
                                    <p>Publicado hace: {formatDistanceToNow(new Date(creado),{locale: es})}</p>
                                    <p css={css`
                                        color: #a7a7a7;
                                    `}
                                    >Creado por: {creador?.nombre} |  <span css={css`
                                        font-weight: bold;
                                        text-transform: uppercase;
                                    `}>{empresa}</span></p>
                                </div>
                                

                                <ContImagen 
                                    css={css`
                                        background-image: url(${URLImage});
                                    `}
                                ></ContImagen>
                                <p>{descripcion}</p>
                                

                                {auth && (
                                    <>
                                        <h2>Agrega tu comentario</h2>
                                        <form>
                                            <Campo>
                                                <input
                                                    type='text'
                                                    name='mensaje'
                                                    placeholder='Ingrese un comentario al producto'
                                                />
                                            </Campo>

                                            <InputSubmit type='submit' value={"Agregar Comentario"}/>
                                        </form>
                                    
                                    </>
                                )}
                                <h2
                                    css={css`
                                        margin: 2rem 0;
                                    `}
                                >Comentarios</h2>

                                {comentarios?.map(comentario => (
                                    <li>
                                        <p>{comentario.nombre}</p>
                                        <p>Escrito por: {comentario.usuarioNombre}</p>
                                    </li>
                                ))}
                            </div>

                            <aside>
                                    <Link
                                        href={url}
                                        target='_blank'
                                    >
                                        <Boton
                                            css={css`
                                                width: 100%;
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                gap: 2rem;
                                            `}
                                            brRad={true}
                                            bgColor={true}
                                        >Visitar
                                            <i className="fa-solid fa-up-right-from-square"></i>
                                        </Boton>
                                    </Link>

                                    <div css={css`
                                        display: flex;
                                        align-items: center;
                                        gap: 2rem;
                                        margin-top: 5rem;
                                        justify-content: space-between;
                                    `}>
                                        <p css={css`
                                            flex: 1;
                                            text-align: center;
                                            font-weight: 700;
                                        `}>{votos} Votos</p>

                                        {auth && (
                                            <Boton
                                                css={css`
                                                    flex: 2;
                                                    width: 100%;
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                    gap: 2rem;
                                                `}

                                                onClick={votarProducto}
                                            >
                                                Votar
                                                <i className="fa-solid fa-thumbs-up"></i>
                                            </Boton>
                                        )}

                                        
                                    </div>
                            </aside>
                        </ContProducto>
                    </div>
                </>
            )}
            

        </Layout>
    )
}

export default Producto

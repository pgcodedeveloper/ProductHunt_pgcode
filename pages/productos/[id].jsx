import Layout from '../../components/layout/Layout';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { collection, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { FirebaseContext } from '../../firebase';
import { deleteDoc } from "firebase/firestore"
import { getStorage, ref, deleteObject } from "firebase/storage"
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

const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #da552f;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
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
        height: 500px;
    }
    :hover{
        scale: 1.05;
        cursor: zoom-in;
    }
`;
const Producto = () => {
    //Obtengo el id del producto
    const router = useRouter();
    const { id } = router.query;

    const [producto, setProducto] = useState({});
    const [cargando, setCargando] = useState(true);
    const [comentario, setComentario] = useState({});
    const [error,setError] = useState(false);
    const [consultarDB,setConsultarDB] = useState(true);
    const { firebase, auth } = useContext(FirebaseContext);
    
    //Obtener el producto por su id
    useEffect(() =>{
        if(id){
            const obtenerProducto = async () =>{
                const producto = await getDoc(doc(collection(firebase.db,"productos",),id));
                
                if(producto.exists()){
                    setProducto(producto.data());
                    setConsultarDB(false);
                    setError(false);
                }
                else{
                    Swal.fire({
                        title: 'Error 404',
                        text: 'Producto no encontrado',
                        icon: 'error',
                        timer: 2500
                    });
                    setError(true);
                    setConsultarDB(false);
                    router.push('/');
                }
                setCargando(false);
            }
            obtenerProducto();
        }
    },[id,producto]);

    const { nombre,descripcion, empresa, url, comentarios, votos,URLImage, creado,creador, haVotado } = producto;

    const votarProducto =  async () =>{
        if(!auth){
            return router.push('/login');
        }

        const nuevoTotal = votos + 1;

        //Verificar si el usuario ya voto
        if(haVotado.includes(auth.uid)) return;

        //Guardar el id
        const haV = [...haVotado, auth.uid];

        //Act la BD
        const docRef = doc(firebase.db, "productos", `${id}`);
 
        updateDoc(docRef, {
            votos: increment(nuevoTotal), 
            haVotado: haV
        });

        //Act el State
        setProducto({
            ...producto,
            votos: nuevoTotal
        });

        setConsultarDB(true);
    }

    const comentarioChange = e =>{
        setComentario({
            ...comentario,
            [e.target.name] : e.target.value
        });
    }

    const esCreador = id =>{
        if(creador.id == id){
            return true;
        }
    }

    const agregarComentario = e =>{
        e.preventDefault();
        
        if(!auth){
            return router.push('/login');
        }
        comentario.usrId = auth.uid;
        comentario.usrNombre = auth.displayName;
        
        const nuevoComentario = [...comentarios, comentario];
        
        const docRef = doc(firebase.db, "productos", `${id}`);
 
        updateDoc(docRef, {
            comentarios: nuevoComentario
        });

        //Act el State
        setComentario({
            ...comentario,
            comentarios: nuevoComentario
        });

        

        e.target.reset();
        Swal.fire({
            title: 'Comentario agregado',
            text: 'Usted agregó un comentario a la publicación',
            icon: 'success'  
        });
        setConsultarDB(true);

    }

    const puedeBorrar = ()=>{
        if(!auth) return false;

        if(creador.id === auth.uid){
            return true;
        }
    }

    const eliminarProducto =() =>{
        Swal.fire({
            title: '¿Esta usted seguro de querer eliminar el producto?',
            text: ' Esta acción no podra ser recuperada',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((response) =>{
            if(response.isConfirmed){
                eliminarProduct();
            }
        });
    }

    const eliminarProduct = async () =>{
        if(!auth){
            return router.push('/login');
        }
        if(creador.id !== auth.uid){
            return router.push('/');
        }
        try {
            await deleteDoc(doc(firebase.db,"productos",id));

            const storage = getStorage();
            const img = ref(storage, URLImage);

            deleteObject(img).then(() =>{
                Swal.fire({
                    title: 'Exito',
                    text: 'Producto eliminado correctamente',
                    timer: 3000,
                    icon: 'success'
                });
            }).catch((error) =>{
                console.log(error);
            });

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout
            titulo={`Producto`}
        >
            {cargando ? <p>Cargando ...</p> : (
                <>
                    {!error && (
                        <>
                            <div className='contenedor'>
                                <h1
                                    css={css`
                                        text-align: center;
                                        margin-top: 5rem;
                                        font-size: 4rem;
                                        margin-bottom: 5rem;
                                        text-transform: uppercase;
                                        font-weight: 900;
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
                                                <form onSubmit={agregarComentario}>
                                                    <Campo>
                                                        <input
                                                            type='text'
                                                            name='mensaje'
                                                            placeholder='Ingrese un comentario al producto'
                                                            onChange={comentarioChange}
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
                                        {comentarios?.length === 0 ? "Aún no hay comentarios" : (
                                            <ul>
                                                {comentarios?.map((comentario, i) => (
                                                    <li
                                                        key={`${comentario.usrId}-${i}`}
                                                        css={css`
                                                            border: 1px solid #e1e1e1;
                                                            padding: 2rem;
                                                            border-radius: 2rem;
                                                            margin-bottom: 2.5rem;
                                                            
                                                            @media(min-width: 768px){
                                                                &:last-of-type{
                                                                    margin-bottom: 0;
                                                                }   
                                                            }
                                                        `}
                                                    >
                                                        <p
                                                            css={css`

                                                            `}
                                                        >Mensaje: {comentario.mensaje}</p>
                                                        <p>
                                                            Escrito por: {''}

                                                            <span
                                                                css={css`
                                                                    font-weight: bold;
                                                                `}
                                                            >
                                                                {comentario.usrNombre}
                                                            </span>
                                                        </p>
                                                        {esCreador(comentario.usrId) && <CreadorProducto>Es Creador</CreadorProducto>}
                                                    </li>
                                                ))}
                                            </ul>
                                        )} 
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

                                {puedeBorrar() && 
                                    <div
                                        css={css`
                                            margin-top: 5rem;
                                            display: flex;
                                            flex-direction: column;
                                            align-items: center;
                                            justify-content: center;
                                            border-top: 1px solid #000000a2;
                                            padding: 2rem;

                                            @media(max-width: 448px) {
                                                margin-bottom: 3rem;
                                            }
                                        `}
                                    >
                                        <Boton
                                            css={css`
                                                display: flex;
                                                align-items: center;
                                                justify-content: center;
                                                gap: 1rem;
                                            `}
                                            brRad={true}
                                            bgColor={true}
                                            onClick={eliminarProducto}
                                        >
                                            Eliminar Producto
                                            <i className="fa-solid fa-trash"></i>
                                        </Boton>
                                    </div>
                                }
                            </div>
                        </>
                    )}
                </>
            )}
            

        </Layout>
    )
}

export default Producto

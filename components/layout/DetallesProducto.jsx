import Image from 'next/image';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';

const Producto = styled.li`
    padding: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
    border-radius: 1rem;
`;

const DescripcionProducto = styled.div`
    flex: 0 1 600px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 2rem;
`;

const Titulo = styled.a`
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    color: black;

    :hover{
        cursor: pointer;
    }
`;

const TextoDescripcion = styled.p`
    margin: 0;
    font-size: 1.5rem;
    color: #888;
`;
const Comentarios = styled.div`
    margin-top: 2rem;
    display: flex;
    align-items: center;
    div{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #e1e1e1;
        padding: .3rem 1rem;
        border-radius: .5rem;
        gap: 2rem;
    }

    i{
        font-size: 2rem;
    }

    p{
        font-size: 1.5rem;
        font-weight: 700;
    }   

`;

const Votos = styled.div`
    flex: 0 0 auto;
    text-align: center;
    border: 1px solid #e1e1e1;
    padding: 1rem 3rem;

    div{
        font-size: 2rem;
        font-family: 'Courier New', Courier, monospace;
    }

    p{
        margin: 0;
        font-size: 2rem;
        font-weight: 700;
    }
`
const DetallesProducto = ({producto}) => {
    
    const { id, nombre,descripcion, empresa, url, comentarios, votos,URLImage, creado } = producto;
    return (
        <Producto>
            <DescripcionProducto>
                <div 
                    css={css`
                        display: flex;
                        align-items: center;
                    `}
                >
                    <Image
                        src={URLImage} 
                        width={250} 
                        height={150}
                        alt="Imagen del producto"
                    />
                </div>

                <div>
                    <Link
                        href={`/productos/${id}`}
                    >
                        <Titulo>{nombre}</Titulo>
                    </Link>
                    <TextoDescripcion>{descripcion}</TextoDescripcion>

                    <Comentarios>
                        <div>
                            <i className="fa-solid fa-comments"></i>
                            <p>{comentarios?.length} Comentarios</p>
                        </div>
                    </Comentarios>
                    <p css={css`
                        display: flex;
                        align-items: center;
                        gap: 1.5rem;
                        font-size: 1.5rem;
                        color:#888; ;
                    `}
                    >Publicado hace: {formatDistanceToNow(new Date(creado),{locale: es})}
                        <i className="fa-solid fa-calendar-days"></i>
                    </p>
                </div>
            </DescripcionProducto>

            <Votos>
                <div>&#9650;</div>
                <p>{votos}</p>
            </Votos>
        </Producto>
    )
}

export default DetallesProducto

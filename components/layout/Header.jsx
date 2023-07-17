import Link from 'next/link';
import React, { useContext } from 'react';
import Buscador from '../ui/Buscador';
import Navegacion from './Navegacion';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Boton from '../ui/Boton';
import { FirebaseContext } from '../../firebase';
import Swal from 'sweetalert2';

const ContenedorHeader = styled.div`
    max-width: 1200px;
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
        flex-direction: row;
        justify-content: space-between;
    }

    @media(max-width: 448px) {
        padding: 1rem;
        gap: 2rem;
    }
`;

const Logo = styled.a`
    color: var(--naranja);
    font-size: 3.5rem;
    line-height: 0;
    font-weight: 700;
    font-family: 'Roboto Slab', serif;
    margin-right: 2rem;
    cursor: pointer;

    @media(max-width: 448px) {
        margin: 0;
    }
`
const Header = () => {

    const { auth, firebase } = useContext(FirebaseContext);
    return (
        <header
            css={css`
                border-bottom: 2px solid #e1e1e1;
                padding: 1rem 0;
            `}
        >
            <ContenedorHeader>
                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        gap: 2rem;
                        @media (min-width: 768px) {
                            flex-direction: row;
                        }
                    `}
                >
                    <Link href={'/'} legacyBehavior>
                        <Logo>P</Logo>
                    </Link>
                    
                    <Buscador />

                    <Navegacion/>
                </div>

                <div
                    css={css`
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 2rem;
                    `}

                >
                    {auth ? (
                        <>
                            <p>Hola: {auth?.displayName}</p>
                            <Boton
                                bgColor='true'
                                type='button'
                                brRad='true'
                                onClick={() =>{
                                    Swal.fire({
                                        title: 'Cerrar Sesión',
                                        text: '¿Esta seguro de esta acción?',
                                        icon: 'question',
                                        showConfirmButton: true,
                                        confirmButtonText: 'Si',
                                        showCancelButton: true,
                                        cancelButtonText: 'No'
                                    }).then((response) =>{
                                        if(response.isConfirmed){
                                            firebase.cerrarSesion();
                                        }
                                    });
                                }}
                            >Cerrar Sesión</Boton>
                        </>
                    ) : (
                        <>
                            <Link href={'/login'} legacyBehavior>
                                <Boton
                                    bgColor="true"
                                    brRad='true'
                                >Login</Boton>
                            </Link>
                            <Link href={'/crear-cuenta'} legacyBehavior>
                                <Boton
                                    brRad='true'
                                >Crear Cuenta</Boton>
                            </Link>
                        </>
                    )}
                </div>
            </ContenedorHeader>
        </header>
    )
}

export default Header

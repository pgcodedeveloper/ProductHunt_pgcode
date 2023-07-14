import Link from 'next/link';
import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';
const Nav = styled.nav`
    padding-left: 2rem;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 2rem;

    @media(max-width: 448px) {
        z-index: 1;
        background-color: rgba(236, 234, 234, 0.932);
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem;
        justify-content: space-evenly;
    }
    a{
        font-size: 1.5rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: .5rem;
        i{
            display: inline-block;
            font-size: 2rem;

            @media(min-width: 768px) {
                display: none;
            }
        }
    }

    
`
const Navegacion = () => {
    const {auth} = useContext(FirebaseContext);
    return (
        <Nav>
            <Link href={'/'} legacyBehavior>
                <a>
                    <i className="fa-solid fa-house"></i>
                    Inicio
                </a>
            </Link>
            <Link href={'/populares'} legacyBehavior>
                <a>
                    <i className="fa-solid fa-fire"></i>
                    Populares
                </a>
                
            </Link>
            {auth && (
                <Link href={'/nuevo-producto'} legacyBehavior>
                    <a>
                        <i className="fa-solid fa-plus"></i>
                        Nuevo
                    </a>
                </Link>
            )}
            
        </Nav>
    )
}

export default Navegacion

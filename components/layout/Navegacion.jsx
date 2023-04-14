import Link from 'next/link';
import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { FirebaseContext } from '../../firebase';
const Nav = styled.nav`
    padding-left: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;

    @media (min-width: 768px) {
        flex-direction: row;
    }
    a{
        font-size: 1.5rem;
        color: var(--gris2);
        font-family: 'PT Sans', sans-serif;
        
    }

    
`
const Navegacion = () => {
    const {auth} = useContext(FirebaseContext);
    return (
        <Nav>
            <Link href={'/'}>Inicio</Link>
            <Link href={'/populares'}>Populares</Link>
            {auth && (
                <Link href={'/nuevo-producto'}>Nuevo Producto</Link>
            )}
            
        </Nav>
    )
}

export default Navegacion

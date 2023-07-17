import Head from 'next/head';
import React, { useContext } from 'react';
import Header from './Header';
import { FirebaseContext } from '../../firebase';
import Loader from '../ui/Loader';

const Layout = ({children, titulo}) => {
    const { auth,cargando } = useContext(FirebaseContext);

    return (
        
        <>
            <Head>
                {titulo === undefined ? (
                    <title>Product Hunt - Cargando...</title>
                ) : (
                    <title>Product Hunt - {titulo}</title>
                )}
                <meta name="description" content="Product Hunt, donde podrás publicar tus productos y recibir votos" />
            </Head>
            {cargando ? <Loader /> : (
                <>
                    <Header />
                    <main>
                        {children}
                    </main>
                </>
            )}
            
        </>
    )
}

export default Layout

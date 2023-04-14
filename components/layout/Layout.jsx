import Head from 'next/head';
import React, { useContext } from 'react';
import Header from './Header';
import { FirebaseContext } from '../../firebase';

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
            {cargando ? <p>Cargando ...</p> : (
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

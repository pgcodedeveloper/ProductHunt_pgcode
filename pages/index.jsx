import Layout from "../components/layout/Layout";
import React from 'react';
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../hooks/useProductos";
import { css } from '@emotion/react';

const Home = () => {

    const { productos } = useProductos('creado');
    
    return (
        <Layout
            titulo={'Inicio'}
        >
            <div className="listado-productos">
                <div className="contenedor">
                    {productos?.length > 0 ? (
                        <ul className="bg-white">
                            {productos?.map(producto => (
                                <DetallesProducto 
                                    key={producto.id}
                                    producto={producto}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p
                            css={css`
                                text-align: center;
                                font-size: 2rem;
                                font-weight: bold;

                            `}
                        >Aún no hay productos</p>
                    )}
                    
                </div>
            </div>
        </Layout>
    )
}

export default Home


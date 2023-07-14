import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useRouter } from 'next/router'
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../hooks/useProductos";

const Buscar = () => {

    const router = useRouter();
    const { query: {q}} = router;

    const { productos, cargando } = useProductos('creado');
    const [resultado, setResultado] = useState([]);

    useEffect(() =>{
        if(q){
            const busqueda = q.toLowerCase();

            const filtro = productos.filter( prod => {
                return(
                    prod.nombre.toLowerCase().includes(busqueda) || 
                    prod.descripcion.toLowerCase().includes(busqueda)
                );
            });

            setResultado(filtro);
        }
        
    },[q,productos]);
    return (
        <Layout
            titulo={'Resultado de Búsqueda'}
        >
            <div className="listado-productos">
                <div className="contenedor">
                    <ul className="bg-white">
                        {resultado.map(producto => (
                            <DetallesProducto 
                                key={producto.id}
                                producto={producto}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default Buscar

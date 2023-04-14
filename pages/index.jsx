import Layout from "../components/layout/Layout";
import React, { useEffect, useState, useContext} from 'react';
import { FirebaseContext } from "../firebase";
import { collection, getDocs, orderBy } from "firebase/firestore";
import DetallesProducto from "../components/layout/DetallesProducto";

const Home = () => {

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const { firebase } = useContext(FirebaseContext);

    useEffect(()=>{
        const obtenerProductos = async () =>{
            setCargando(true);
            const query = await getDocs(collection(firebase.db,"productos"));
            orderBy('creado','desc');
            const productos = query.docs.map(doc =>{
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });
            setProductos(productos);
        }
        obtenerProductos();
        setCargando(false);
    },[]);

    
    return (
        <Layout
            titulo={'Inicio'}
        >
            <div className="listado-productos">
                <div className="contenedor">
                    <ul className="bg-white">
                        {productos.map(producto => (
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

export default Home


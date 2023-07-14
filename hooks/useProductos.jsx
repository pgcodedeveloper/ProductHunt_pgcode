import React, { useEffect, useState, useContext} from 'react';
import { FirebaseContext } from "../firebase";
import { collection, getDocs, orderBy,query } from "firebase/firestore";


const useProductos = (orden) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(false);
    const { firebase } = useContext(FirebaseContext);

    useEffect(()=>{
        const obtenerProductos = async () =>{
            setCargando(true);
            const productosRef = collection(firebase.db, 'productos');
            const q = query(productosRef, orderBy(orden, 'desc'));
            const querySnapshot = await getDocs(q);

            const productos = querySnapshot.docs.map(doc =>{
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
    return {
        productos,
        cargando
    }
}

export default useProductos

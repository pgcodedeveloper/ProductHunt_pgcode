import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

const useAuth = () => {

    const [auth,setAuth] = useState(null);
    const [cargando, setCargando] = useState(true);
    useEffect(() =>{
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            
            if(usuario){
                setAuth(usuario);
            }
            else{
                setAuth(null);
            }
            setTimeout(() => {
                setCargando(false);
            }, 1000);
            
        });

        return () => unsuscribe();

    },[]);
    return {auth, cargando};
}

export default useAuth

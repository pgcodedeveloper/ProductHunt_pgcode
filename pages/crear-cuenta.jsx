import React, { useState } from 'react'
import Swal from 'sweetalert2';
import Layout from '../components/layout/Layout'
import { css } from '@emotion/react';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import useValidacion from '../hooks/useValidacion';
import validarCrearCuenta from '../validacion/validarCrearCuenta';
import firebase from '../firebase';
import { translate } from 'traduction';
import Router from 'next/router';

const STATE_INICIAR = {
    nombre: '',
    email: '',
    password: ''
};

const CrearCuenta = () => {
    
    const [alerta, setAlerta] = useState({});
    const {valores,errores,handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAR,validarCrearCuenta,crearCuenta)
    const {nombre, email, password} = valores;
    
    async function crearCuenta(){
        try {
            await firebase.registrar(nombre, email, password);
            Swal.fire({
                title: 'Exito',
                text: 'El usuario se creo correctamente',
                icon: 'success',
                timer: 2500
            });
            Router.push('/login');
        } catch (error) {
            console.error('Hubo un error al crear el usuario', error.message);
            //Comienzo a formatear el mensaje recibido de firebase para que se pueda ver mejor
            let errorM = error.message;
            errorM = errorM.replaceAll(' ','');
            let errorMsg = errorM.substring(9).split('/')[1];
            let mensaje = errorMsg.substr(0,(errorMsg.length - 2));
            
            const msg = await translate(mensaje.toUpperCase(),'en','es');
            Swal.fire({
                title: 'Error',
                text: msg,
                icon: 'error',
                timer: 2500
            });
        }
    }
    
    return (
        <Layout
            titulo={'Crear Cuenta'}
        >
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                >Crear Cuenta</h1>

                <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <Campo>
                        <label htmlFor="nombre">Nombre</label>
                        <input 
                            type="text" 
                            id='nombre'
                            placeholder='Tu Nombre'
                            name='nombre'
                            value={nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />

                    </Campo>

                    {errores?.nombre && <Error>{errores?.nombre}</Error>}

                    <Campo>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id='email'
                            placeholder='Tu Email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        
                    </Campo>

                    {errores?.email && <Error>{errores?.email}</Error>}

                    <Campo>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id='password'
                            placeholder='Tu Password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Campo>

                    {errores?.password && <Error>{errores?.password}</Error>}

                    <InputSubmit 
                        type="submit" 
                        value="Crear Cuenta" 
                    />
                </Formulario>
            </>
        </Layout>
    )
}

export default CrearCuenta

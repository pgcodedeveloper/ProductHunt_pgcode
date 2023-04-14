import React, { useState } from 'react'
import Swal from 'sweetalert2';
import Layout from '../components/layout/Layout'
import { css } from '@emotion/react';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/Formulario';
import useValidacion from '../hooks/useValidacion';
import validarLogin from '../validacion/validarLogin';
import firebase from '../firebase';
import { translate } from 'traduction';
import Router from 'next/router';

const STATE_INICIAR = {
    email: '',
    password: ''
};
const Login = () => {

    const [alerta, setAlerta] = useState({});
    const {valores,errores,handleSubmit,handleChange,handleBlur} = useValidacion(STATE_INICIAR,validarLogin,iniciarSesion)
    const {email, password} = valores;
    
    async function iniciarSesion(){
        try {
            await firebase.login(email,password);
            Router.push('/');
        } catch (error) {
            console.error('Hubo un error al autenticar el usuario', error.message);
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
            titulo={'Iniciar Sesión'}
        >
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-top: 5rem;
                    `}
                >Iniciar Sesión</h1>

                <Formulario
                    onSubmit={handleSubmit}
                    noValidate
                >
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
                        value="Iniciar Sesión" 
                    />
                </Formulario>
            </>
        </Layout>
    )
}

export default Login

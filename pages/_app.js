import '../styles/globals.css';
import firebase, { FirebaseContext } from '../firebase';
import useAuth from '../hooks/useAuth';

function MyApp({ Component, pageProps }) {
    const {auth, cargando} = useAuth();
    return (
        <FirebaseContext.Provider
            value={{
                firebase,
                auth,
                cargando
            }}
        >
            <Component {...pageProps} />
        </FirebaseContext.Provider>
    )
}

export default MyApp

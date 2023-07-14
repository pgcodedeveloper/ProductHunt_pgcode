const firebaseConfig = {
    apiKey: process.env.API_Key,
    authDomain: process.env.auth_Domain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};

export default firebaseConfig;
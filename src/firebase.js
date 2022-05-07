import firebase from  'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyB2nyRt7Z2TkBfmA7fyb14-vTdXMu1Wkvk",
  authDomain: "z-prefix-dev.firebaseapp.com",
  projectId: "z-prefix-dev",
  storageBucket: "z-prefix-dev.appspot.com",
  messagingSenderId: "497969693647",
  appId: "1:497969693647:web:4dedb485d68fe2834b48ba"
});

export const auth = app.auth();
export default app;
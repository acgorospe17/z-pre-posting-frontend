import React from 'react';
import { auth } from '../firebase';
import axios from 'axios';

const AuthContext = React.createContext()

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [apiData, setApiData] = React.useState(null);

  function signup(email, password) {
    return (
      auth.createUserWithEmailAndPassword(email, password)
        .then((res) => {
          axios.post(`${process.env.REACT_APP_API_URL}/users`, {
            fb_uid: res.user.uid
          })
        })
    )
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updatePhoto(url) {
    return currentUser.updateProfile({photoURL: url});
  }

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    })

    return unsubscribe;
  }, [])

  React.useEffect(() => {
    if (currentUser?.uid) {
      axios.get(`${process.env.REACT_APP_API_URL}/users?fb_uid=${currentUser?.uid}`)
        .then(res => setApiData(res.data[0]));
    }

    return setApiData(null)
  }, [currentUser]);

  React.useEffect(() => {

  })

  const value = {
    currentUser,
    apiData,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updatePhoto,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
import TopBar from './components/layout/TopBar';
import ScrollUp from './components/layout/ScrollUp';
import Landing from './components/pages/Landing';
import AllPosts from './components/pages/AllPosts';
import MyPosts from './components/pages/MyPosts';
import CreatePost from './components/pages/CreatePost';
import EditProfile from './components/pages/EditProfile';

import { AuthProvider } from './contexts/AuthContext';
import { ColorModeThemeProvider } from './contexts/ThemeContext';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <AuthProvider>
      <ColorModeThemeProvider>
        <TopBar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/all-posts' element={<AllPosts />} />
          <Route path='/my-posts' element={<MyPosts />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/edit-profile' element={<EditProfile />} />
        </Routes>
        <ScrollUp />
      </ColorModeThemeProvider>
    </AuthProvider>
  );
}

export default App;
